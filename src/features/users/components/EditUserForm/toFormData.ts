import { EditUserFormQuery_user as UserType } from './graphql/.generated/EditUserFormQuery';
import { EditUserFormData } from './EditUserFormData';

export default function toFormData(input: UserType): EditUserFormData {
  return {
    id: input.id,
    jobTypeId: input.jobType?.id,
    unit: input.unit ?? undefined,
    currency: input.currency ?? undefined,
    language: input.language,

    firstName: input.firstName ?? undefined,
    lastName: input.lastName ?? undefined,
    email: input.email ?? undefined,
    phoneNumber: input.phoneNumber ?? undefined,

    salaryPaymentType: input.salaryPaymentType ?? undefined,
    salaryPaymentDay: input.salaryPaymentDay ?? undefined,
    salaryPaymentValue: input.salaryPaymentValue ?? undefined,
    baseRate: input.baseRate ?? undefined,

    address: {
      address: input.address?.address,
      city: input.address?.city,
      postalCode: input.address?.postalCode,
      countryId: input.address?.countryId
    },

    bankName: input.bankAccount?.bankName ?? undefined,
    bankAccount: input.bankAccount?.bankAccount ?? undefined,
    bankRegistration: input.bankAccount?.bankRegistration ?? undefined,

    personId: input.taxInfo?.personId ?? undefined,
    taxCard: input.taxInfo?.taxCard ?? undefined,

    bankNameHidden: input.bankAccountHidden?.bankName ?? undefined,
    bankAccountHidden: input.bankAccountHidden?.bankAccount ?? undefined,
    bankRegistrationHidden: input.bankAccountHidden?.bankRegistration ?? undefined,

    personIdHidden: input.taxInfoHidden?.personId ?? undefined,
    taxCardHidden: input.taxInfoHidden?.taxCard ?? undefined,

    vacationPayment: input.vacationPayment ?? undefined
  };
}
