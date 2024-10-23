import { TaxCardEnum, UserUpdateInputArgs, SalaryPaymentTypeEnum } from '~/.generated/globalTypes';
import { EditUserFormData } from './EditUserFormData';

export default function toInputArgs(input: EditUserFormData): UserUpdateInputArgs {
  return {
    jobType: input.jobTypeId ? { connect: { id: input.jobTypeId } } : undefined,
    unit: input.unit,
    currency: input.currency,
    language: input.language!,

    firstName: input.firstName!,
    lastName: input.lastName!,
    email: input.email,
    phoneNumber: input.phoneNumber,

    salaryPaymentType: (input.salaryPaymentType as SalaryPaymentTypeEnum) ?? undefined,
    salaryPaymentDay: input.salaryPaymentType === 'TIMED' ? input.salaryPaymentDay ?? undefined : null,
    salaryPaymentValue: input.salaryPaymentType === 'VALUE' ? input.salaryPaymentValue ?? undefined : null,
    baseRate: input.baseRate ?? undefined,

    address: input.address?.address,
    city: input.address?.city,
    postalCode: input.address?.postalCode,
    countryId: input.address?.countryId,

    bankName: input.bankName ?? undefined,
    bankAccount: input.bankAccount ?? undefined,
    bankRegistration: input.bankRegistration ?? undefined,

    personId: input.personId ?? undefined,
    taxCard: (input.taxCard as TaxCardEnum) ?? undefined,

    vacationPayment: input.vacationPayment ?? undefined
  };
}
