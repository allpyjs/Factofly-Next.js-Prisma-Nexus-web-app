import { useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import { useLazyQuery } from '@apollo/client';
import EditInvoiceFormUpdateMutation from './graphql/EditInvoiceFormUpdateMutation.gql';
import { EditInvoiceFormUpdateMutation as EditInvoiceFormUpdateMutationType } from './graphql/.generated/EditInvoiceFormUpdateMutation';
import EditInvoiceFormQuery from './graphql/EditInvoiceFormQuery.gql';
import { EditInvoiceFormQuery as EditInvoiceFormQueryType } from './graphql/.generated/EditInvoiceFormQuery';
import { toInputArgs } from './mapping/toInputArgs';
import { EditInvoiceFormData } from './EditInvoiceFormData';
import { toFormData } from './mapping/toFormData';
import useEditForm from '~/features/forms/hooks/useEditForm';
import transformNumber from '~/utils/transformNumber';
import SelectCustomerQuery from '../CreateInvoiceForm/graphql/SelectCustomerQuery.gql';

const useEditInvoiceForm = (invoiceId: number) => {
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
            .transform(transformNumber)
            .nullable()
            .integer()
            .moreThan(0)
            .required(),

          paymentDueDays: yup
            .number()
            .label(t('labels.paymentDueDays'))
            .transform(transformNumber)
            .nullable()
            .integer()
            .moreThan(0)
            .required(),
          currency: yup.string().label(t('labels.currency')).required(),

          invoiceDate: yup.date().label(t('labels.invoiceDate')).required(),
          startDate: yup.date().label(t('labels.startDate')).required(),
          endDate: yup.date().label(t('labels.endDate')).required(),
          termsAccepted: yup
            .bool()
            .oneOf([true], t('validation.termsAccepted'))
            .label(t('labels.termsAccepted'))
            .required(),

          paidAmountDkk: yup.number().nullable().label(t('labels.paidAmount')).transform(transformNumber),

          useCredit: yup.bool(),

          lines: yup
            .array(
              yup.object({
                description: yup
                  .string()
                  .label(t('labels.description'))
                  .max(255)
                  .required()
                  .when('deleted', {
                    is: true,
                    then: (schema) => schema.notRequired()
                  }),
                quantity: yup
                  .number()
                  .nullable()
                  .label(t('labels.quantity'))
                  .transform(transformNumber)
                  .required()
                  .when('deleted', {
                    is: true,
                    then: (schema) => schema.not([0]).notRequired()
                  }),

                unitPrice: yup
                  .number()
                  .nullable()
                  .label(t('labels.unitPrice'))
                  .transform(transformNumber)
                  .required()
                  .when('deleted', {
                    is: true,
                    then: (schema) => schema.notRequired()
                  })
              })
            )

            .required()
            .min(1)
        })
        .required(),
    [t]
  );

  const editForm = useEditForm({
    validationSchema,
    translationKey: 'invoices',
    parseMutationData: (formData: EditInvoiceFormData) => ({
      variables: { input: toInputArgs(formData), where: { id: invoiceId } }
    }),
    parseLoadFormData: (initialData: EditInvoiceFormQueryType) => toFormData(initialData.invoice!),
    parseUpdateFormData: (updatedData: EditInvoiceFormUpdateMutationType) =>
      toFormData(updatedData.updateInvoice!),
    createMutation: EditInvoiceFormUpdateMutation,
    query: EditInvoiceFormQuery,
    refetchQueries: ['InvoicesTableQuery', 'GetLoggedInUser'],
    queryOptions: {
      variables: {
        where: { id: invoiceId }
      }
    }
  });

  // when the customer id changes, pre-populate some of the values
  const customerId = editForm.form.watch('customerId');
  const [getCustomer] = useLazyQuery(SelectCustomerQuery);
  useEffect(() => {
    if (customerId) {
      getCustomer({
        variables: { where: { id: Number(customerId) } },
        onCompleted: ({ customer }) => {
          editForm.form.setValue('allowEarlyPayment', customer.allowEarlyPayment);
        }
      });
    }
  }, [customerId, editForm.form, getCustomer]);

  return editForm;
};

export default useEditInvoiceForm;
