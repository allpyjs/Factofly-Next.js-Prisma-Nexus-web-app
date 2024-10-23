import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import EditCustomerFormUpdateMutation from './graphql/EditCustomerFormUpdateMutation.gql';
import { EditCustomerFormUpdateMutation as EditCustomerFormUpdateMutationType } from './graphql/.generated/EditCustomerFormUpdateMutation';
import { CustomerTypeEnum, CustomerUpdateInputArgs } from '../../../../.generated/globalTypes';
import EditCustomerFormQuery from './graphql/EditCustomerFormQuery.gql';
import {
  EditCustomerFormQuery as EditCustomerFormQueryType,
  EditCustomerFormQuery_customer as CustomerType
} from './graphql/.generated/EditCustomerFormQuery';
import useEditForm from '~/features/forms/hooks/useEditForm';

export type EditCustomerFormData = {
  type: CustomerTypeEnum;

  name: string;
  email: string;
  phoneNumber: string;
  contact: string;

  address_id: number;
  address: string;
  city: string;
  postalCode: string;
  country: number;

  paymentDueDays: number;
  vatId: string;
  ean: string;

  allowEarlyPayment?: boolean;
};

const toFormData = (input: CustomerType): EditCustomerFormData => ({
  type: input.type,

  name: input.name,
  email: input.email,
  phoneNumber: input.phoneNumber,
  contact: input.contact,

  paymentDueDays: input.paymentDueDays!,
  vatId: input.vatId!,
  ean: input.ean,

  address_id: input.address.id,
  address: input.address.address,
  city: input.address.city,
  postalCode: input.address.postalCode,
  country: input.address.country.id,

  allowEarlyPayment: input.allowEarlyPayment ?? undefined
});

const toInputArgs = (input: EditCustomerFormData): CustomerUpdateInputArgs => ({
  type: input.type!,
  name: input.name!,
  email: input.email!,
  phoneNumber: input.phoneNumber!,
  contact: input.contact!,
  paymentDueDays: input.paymentDueDays!,
  vatId: input.vatId!,
  ean: input.ean!,
  allowEarlyPayment: input.allowEarlyPayment,
  address: {
    update: {
      id: input.address_id,
      address: input.address!,
      city: input.city!,
      postalCode: input.postalCode!,
      default: true,
      country: {
        connect: { id: input?.country }
      }
    }
  }
});

const useEditCustomerForm = (customerId: number) => {
  const { t } = useTranslation('customers');
  const validationSchema = yup
    .object({
      type: yup.string().label(t('labels.type')).required(),

      name: yup.string().label(t('labels.name')).required(),
      email: yup.string().label(t('labels.email')).required(),
      phoneNumber: yup.string().label(t('labels.phoneNumber')).required(),
      contact: yup.string().label(t('labels.contact')),

      address: yup.string().label(t('labels.address')).required(),
      city: yup.string().label(t('labels.city')).required(),
      postalCode: yup.string().label(t('labels.postalCode')).required(),
      country: yup.number().label(t('labels.country')).required(),

      paymentDueDays: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .nullable()
        .label(t('labels.paymentDueDays')),
      vatId: yup
        .string()
        .label(t('labels.vatId.dk'))
        .when('country', {
          is: 60,
          then: yup.string().when('type', {
            is: CustomerTypeEnum.BUSINESS,
            then: yup.string().required()
          })
        }),
      ean: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .nullable()
        .test(
          'len',
          t('messages.validEANLength'),
          (val) => val === null || val === undefined || val?.toString().length === 13
        )
        .label(t('labels.ean'))
    })
    .required();
  return useEditForm({
    validationSchema,
    translationKey: 'customers',
    parseMutationData: (formData: EditCustomerFormData) => ({
      variables: { input: toInputArgs(formData), where: { id: customerId } }
    }),
    parseLoadFormData: (initialData: EditCustomerFormQueryType) => toFormData(initialData.customer!),
    parseUpdateFormData: (updatedData: EditCustomerFormUpdateMutationType) =>
      toFormData(updatedData.updateCustomer!),
    createMutation: EditCustomerFormUpdateMutation,
    query: EditCustomerFormQuery,
    refetchQueries: ['CustomerSelectFieldQuery', 'CustomersTableQuery'],
    queryOptions: {
      variables: {
        where: { id: customerId }
      }
    }
  });
};

export default useEditCustomerForm;
