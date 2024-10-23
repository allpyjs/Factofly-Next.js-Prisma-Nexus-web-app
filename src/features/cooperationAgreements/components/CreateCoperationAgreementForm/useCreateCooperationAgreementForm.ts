import { useMemo } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { DeepPartial, UnpackNestedValue } from 'react-hook-form';
import CreateCooperationAgreementFormMutation from './graphql/CreateCooperationAgreementFormMutation.gql';
import { CreateCooperationAgreementFormMutation as CreateCooperationAgreementFormMutationType } from './graphql/.generated/CreateCooperationAgreementFormMutation';
import { CooperationAgreementCreateInputArgs, DeliverableCreateInputArgs } from '~/.generated/globalTypes';
import useCreateForm from '~/features/forms/hooks/useCreateForm';

export type DeliverableFormData = {
  description: string;
};
export type CreateCooperationAgreementFormData = {
  startDate?: Date;
  endDate?: Date;
  customerId?: bigint;
  openEnded?: boolean;
  terminationAgreement?: string;
  taskDescription?: string;
  extraWork?: boolean;
  extraWorkNotification?: string;
  extraWorkNotificationOther?: string;
  priceDetails?: string;
  equipmentSupplied?: boolean;
  equipmentDetails?: string;
  specialConditions?: string;
  paymentType?: string;
  amount?: number;
  paymentTerm?: string;
  paymentTermOther?: string;
  paymentTermDays?: number;
  paymentTermSpecial?: string;
  deliverables?: DeliverableFormData[];
  createAsUserId?: number;
};

const toDeliverablesInputArgs = (input: DeliverableFormData): DeliverableCreateInputArgs => ({
  description: input.description
});

const toInputArgs = (input: CreateCooperationAgreementFormData): CooperationAgreementCreateInputArgs => ({
  startDate: input.startDate,
  endDate: input.endDate,
  active: true,
  openEnded: input.openEnded!,
  customerId: input.customerId!,
  terminationAgreement: input.terminationAgreement!,
  taskDescription: input.taskDescription!,
  extraWork: input.extraWork!,
  extraWorkNotification: input.extraWorkNotification!,
  extraWorkNotificationOther: input.extraWorkNotificationOther!,
  equipmentSupplied: input.equipmentSupplied!,
  equipmentDetails: input.equipmentDetails!,
  specialConditions: input.specialConditions!,
  paymentType: input.paymentType!,
  paymentTerm: input.paymentTerm!,
  paymentTermOther: input.paymentTermOther!,
  paymentTermDays: input.paymentTermDays!,
  paymentTermSpecial: input.paymentTermSpecial!,
  deliverables: input.deliverables
    ? {
        create: input.deliverables!.map(toDeliverablesInputArgs)
      }
    : undefined,
  createAsUserId: input.createAsUserId
});

type FormProps = {
  defaultValues?: UnpackNestedValue<DeepPartial<CreateCooperationAgreementFormData>>;
};

const useCreateCooperationAgreementForm = ({ defaultValues }: FormProps) => {
  const { push } = useRouter();
  const { t } = useTranslation('cooperationAgreements');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          startDate: yup.date().label(t('labels.startDate')).required(),
          endDate: yup
            .date()
            .label(t('labels.endDate'))
            .when('openEnded', { is: false, then: yup.date().label(t('labels.endDate')).required() }),
          terminationAgreement: yup.string().label(t('labels.terminationAgreement')).required(),
          customerId: yup.number().label(t('labels.customer')).required(),
          taskDescription: yup.string().label(t('labels.taskDescription')).required(),
          equipmentSupplied: yup.boolean().label(t('labels.equipmentSupplied')),
          equipmentDetails: yup.string().label(t('labels.equipmentDetails')),
          extraWork: yup.boolean().label(t('labels.extraWork')),
          extraWorkNotification: yup
            .string()
            .label(t('labels.extraWorkNotification'))
            .when('extraWork', {
              is: true,
              then: yup.string().label(t('labels.extraWorkNotification')).required()
            }),
          extraWorkNotificationOther: yup
            .string()
            .label(t('labels.extraWorkNotificationOther'))
            .when('extraWorkNotification', {
              is: 'OTHER',
              then: yup.string().label(t('labels.extraWorkNotificationOther')).required()
            }),
          specialConditions: yup.string().label(t('labels.specialConditions')),
          paymentType: yup.string().label(t('labels.paymentType')).required(),
          paymentTerm: yup.string().label(t('labels.paymentTerm')).required(),
          paymentTermOther: yup
            .string()
            .label(t('labels.paymentTermOther'))
            .when('paymentTerm', {
              is: 'OTHER',
              then: yup.string().label(t('labels.paymentTermOther')).required()
            }),
          paymentTermDays: yup
            .number()
            .label(t('labels.paymentTermDays'))
            .nullable()
            .transform((v) => (Number.isNaN(v) ? null : v))
            .required(),
          paymentTermSpecial: yup.string().label(t('labels.paymentTermSpecial'))
        })
        .required(),
    [t]
  );

  return useCreateForm({
    defaultValues,
    validationSchema,
    refetchQueries: ['CooperationAgreementsTableQuery'],
    translationKey: 'cooperationAgreements',
    parseData: (formData: CreateCooperationAgreementFormData) => ({
      variables: { input: toInputArgs(formData) }
    }),
    createMutation: CreateCooperationAgreementFormMutation,
    onCompleted: ({ createCooperationAgreement }: CreateCooperationAgreementFormMutationType) => {
      push(`/cooperations/${createCooperationAgreement!.id}`);
    }
  });
};

export default useCreateCooperationAgreementForm;
