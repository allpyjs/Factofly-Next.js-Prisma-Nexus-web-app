import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import EditCooperationAgreementFormUpdateMutation from './graphql/EditCooperationAgreementFormUpdateMutation.gql';
import { EditCooperationAgreementFormUpdateMutation as EditCooperationAgreementFormUpdateMutationType } from './graphql/.generated/EditCooperationAgreementFormUpdateMutation';
import { CooperationAgreementUpdateInputArgs } from '../../../../.generated/globalTypes';
import EditCooperationAgreementFormQuery from './graphql/EditCooperationAgreementFormQuery.gql';
import {
  EditCooperationAgreementFormQuery as EditCooperationAgreementFormQueryType,
  EditCooperationAgreementFormQuery_cooperationAgreement as CooperationAgreementType
} from './graphql/.generated/EditCooperationAgreementFormQuery';
import useEditForm from '~/features/forms/hooks/useEditForm';

export type EditCooperationAgreementFormData = {
  startDate?: Date;
  endDate?: Date;
  customerId?: bigint;
  userId?: bigint;
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
};

const toFormData = (input: CooperationAgreementType): EditCooperationAgreementFormData => ({
  startDate: input.startDate,
  endDate: input.endDate,
  openEnded: input.openEnded,
  customerId: input.customerId,
  userId: input.user.id,
  terminationAgreement: input.terminationAgreement,
  taskDescription: input.taskDescription,
  extraWork: input.extraWork,
  extraWorkNotification: input.extraWorkNotification ?? undefined,
  extraWorkNotificationOther: input.extraWorkNotificationOther ?? undefined,
  specialConditions: input.specialConditions ?? undefined,
  paymentType: input.paymentType,
  paymentTerm: input.paymentTerm,
  paymentTermOther: input.paymentTermOther ?? undefined,
  paymentTermDays: input.paymentTermDays,
  paymentTermSpecial: input.paymentTermSpecial ?? undefined,
  equipmentSupplied: input.equipmentSupplied ?? undefined,
  equipmentDetails: input.equipmentDetails ?? undefined
});

const toInputArgs = (input: EditCooperationAgreementFormData): CooperationAgreementUpdateInputArgs => ({
  startDate: input.startDate,
  endDate: input.endDate,
  openEnded: input.openEnded!,
  customerId: input.customerId!,
  terminationAgreement: input.terminationAgreement!,
  taskDescription: input.taskDescription!,
  extraWork: input.extraWork!,
  extraWorkNotification: input.extraWorkNotification!,
  extraWorkNotificationOther: input.extraWorkNotificationOther!,
  specialConditions: input.specialConditions!,
  paymentType: input.paymentType!,
  paymentTerm: input.paymentTerm!,
  paymentTermOther: input.paymentTermOther!,
  paymentTermDays: input.paymentTermDays!,
  paymentTermSpecial: input.paymentTermSpecial!,
  equipmentSupplied: input.equipmentSupplied!,
  equipmentDetails: input.equipmentDetails!
});

const useUpdateCooperationAgreementForm = (cooperationAgreementId: number) => {
  const { t } = useTranslation('cooperationAgreements');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          startDate: yup.date().label(t('labels.startDate')).required(),
          endDate: yup
            .date()
            .nullable()
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

  return useEditForm({
    validationSchema,
    translationKey: 'cooperationAgreements',
    parseMutationData: (formData: EditCooperationAgreementFormData) => ({
      variables: { input: toInputArgs(formData), where: { id: cooperationAgreementId } }
    }),
    parseLoadFormData: (initialData: EditCooperationAgreementFormQueryType) =>
      toFormData(initialData.cooperationAgreement!),
    parseUpdateFormData: (updatedData: EditCooperationAgreementFormUpdateMutationType) =>
      toFormData(updatedData.updateCooperationAgreement!),
    createMutation: EditCooperationAgreementFormUpdateMutation,
    query: EditCooperationAgreementFormQuery,
    queryOptions: {
      variables: {
        where: { id: cooperationAgreementId }
      }
    }
  });
};

export default useUpdateCooperationAgreementForm;
