import { useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { DeepPartial, UnpackNestedValue } from 'react-hook-form';
import { useLazyQuery } from '@apollo/client';
import CreateInvoiceFormMutation from './graphql/CreateInvoiceFormMutation.gql';
import { CreateInvoiceFormMutation as CreateInvoiceFormMutationType } from './graphql/.generated/CreateInvoiceFormMutation';
import { CreateInvoiceFormData } from './CreateInvoiceFormData';
import { toInputArgs } from './mapping/toInputArgs';
import useCreateForm from '~/features/forms/hooks/useCreateForm';
import SelectCustomerQuery from './graphql/SelectCustomerQuery.gql';
import SelectTaskQuery from './graphql/SelectTaskQuery.gql';
import { subtractWeeks } from '~/utils/dateHelpers';
import transformNumber from '~/utils/transformNumber';

type FormProps = {
  defaultValues?: UnpackNestedValue<DeepPartial<CreateInvoiceFormData>>;
};

const useCreateInvoiceForm = ({ defaultValues }: FormProps) => {
  const { push } = useRouter();
  const { t } = useTranslation('invoices');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          customerId: yup.number().label(t('labels.customer')).required(),
          customerContact: yup.string().label(t('labels.customerContact')).required(),
          customerEmail: yup.string().label(t('labels.customerEmail')).required(),
          sendCopyTo: yup.string().label(t('labels.sendCopyTo')),

          taskId: yup.number().label(t('labels.task')),
          jobTypeId: yup.number().label(t('labels.jobType')).required(),

          hoursWorked: yup
            .number()
            .label(t('labels.hoursWorked'))
            .nullable()
            .transform(transformNumber)
            .integer()
            .moreThan(0)
            .required(),

          paymentDueDays: yup
            .number()
            .label(t('labels.paymentDueDays'))
            .nullable()
            .transform(transformNumber)
            .integer()
            .moreThan(0)
            .required(),
          currency: yup.string().label(t('labels.currency')).required(),

          invoiceDate: yup.date().label(t('labels.invoiceDate')).required().min(subtractWeeks(1)),
          startDate: yup.date().label(t('labels.startDate')).required(),
          endDate: yup.date().label(t('labels.endDate')).required().min(yup.ref('startDate')),
          termsAccepted: yup
            .bool()
            .oneOf([true], t('validation.termsAccepted'))
            .label(t('labels.termsAccepted'))
            .required(),

          useCredit: yup.bool(),

          lines: yup
            .array(
              yup.object({
                description: yup.string().label(t('labels.description')).max(255).required(),
                quantity: yup
                  .number()
                  .nullable()
                  .label(t('labels.quantity'))
                  .transform(transformNumber)
                  .not([0])
                  .required(),
                unitPrice: yup
                  .number()
                  .nullable()
                  .label(t('labels.unitPrice'))
                  .transform(transformNumber)
                  .required()
              })
            )
            .required()
            .min(1)
        })
        .required(),
    [t]
  );

  const createForm = useCreateForm({
    defaultValues,
    validationSchema,
    refetchQueries: ['InvoicesTableQuery', 'GetLoggedInUser'],
    translationKey: 'invoices',
    parseData: (formData: CreateInvoiceFormData) => ({
      variables: { input: toInputArgs(formData) }
    }),
    createMutation: CreateInvoiceFormMutation,
    onCompleted: ({ createInvoice: { id } }: CreateInvoiceFormMutationType) => {
      push(`/invoices/${id}`);
    }
  });

  // when the task id changes, pre-populate some of the values
  const taskId = createForm.form.watch('taskId');
  const [getTask] = useLazyQuery(SelectTaskQuery);
  useEffect(() => {
    if (taskId) {
      getTask({
        variables: { where: { id: Number(taskId) } },
        onCompleted: ({ task }) => {
          createForm.form.setValue('customerId', task.customerId);
          createForm.form.setValue('hoursWorked', task.expectedHours);
          createForm.form.setValue('startDate', task.startDate);
          createForm.form.setValue('endDate', task.endDate);
        }
      });
    }
  }, [taskId, createForm.form, getTask]);

  // when the customer id changes, pre-populate some of the values
  const customerId = createForm.form.watch('customerId');
  const [getCustomer] = useLazyQuery(SelectCustomerQuery);
  useEffect(() => {
    if (customerId) {
      getCustomer({
        variables: { where: { id: Number(customerId) } },
        onCompleted: ({ customer }) => {
          createForm.form.setValue('customerContact', customer.contact);
          createForm.form.setValue('customerEmail', customer.email);
          createForm.form.setValue('paymentDueDays', customer.paymentDueDays);
          createForm.form.setValue('allowEarlyPayment', customer.allowEarlyPayment);
        }
      });
    }
  }, [customerId, createForm.form, getCustomer]);

  return createForm;
};

export default useCreateInvoiceForm;
