import * as yup from 'yup';
import { useRouter } from 'next/router';
import { DeepPartial, UnpackNestedValue } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import CustomerCreateMutation from './graphql/CustomerFormCreateMutation.gql';
import { CustomerFormCreateMutation as CustomerCreateMutationType } from './graphql/.generated/CustomerFormCreateMutation';
import { CustomerTypeEnum, CustomerCreateInputArgs } from '../../../../.generated/globalTypes';
import useCreateForm from '~/features/forms/hooks/useCreateForm';

export type CreateCustomerFormData = {
  type?: CustomerTypeEnum;

  name?: string;
  email?: string;
  phoneNumber?: string;
  contact?: string;

  address?: string;
  city?: string;
  postalCode?: string;
  country?: number;

  paymentDueDays?: number;
  vatId?: string;
  ean?: string;
  createAsUserId?: number;
};

const toInputArgs = (input: CreateCustomerFormData): CustomerCreateInputArgs => ({
  type: input.type!,
  name: input.name!,
  email: input.email!,
  phoneNumber: input.phoneNumber!,
  contact: input.contact!,
  paymentDueDays: input.paymentDueDays!,
  vatId: input.vatId!,
  ean: input.ean!,
  address: {
    create: {
      address: input.address!,
      city: input.city!,
      postalCode: input.postalCode!,
      default: true,
      country: {
        connect: { id: input?.country }
      }
    }
  },
  createAsUserId: input.createAsUserId
});

type FormProps = {
  defaultValues?: UnpackNestedValue<DeepPartial<CreateCustomerFormData>>;
};

const useCreateCustomerForm = ({ defaultValues }: FormProps) => {
  const { push } = useRouter();
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
      country: yup.number().nullable().label(t('labels.country')).required(),

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

  return useCreateForm({
    defaultValues,
    validationSchema,
    translationKey: 'customers',
    parseData: (formData: CreateCustomerFormData) => ({
      variables: { input: toInputArgs(formData) }
    }),
    createMutation: CustomerCreateMutation,
    refetchQueries: ['CustomerSelectFieldQuery', 'CustomersTableQuery'],
    onCompleted: ({ createCustomer: { id } }: CustomerCreateMutationType) => {
      push(`/customers/${id}`);
    }
  });
};

export default useCreateCustomerForm;
