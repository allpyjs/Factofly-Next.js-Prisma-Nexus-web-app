import { enumType } from 'nexus';

export type SalaryPaymentType = 'EARLY' | 'ON_PAYMENT' | 'TIMED' | 'VALUE' | 'VIA_INVOICE';

export const salaryPaymentTypes: Record<SalaryPaymentType, SalaryPaymentType> = {
  EARLY: 'EARLY',
  ON_PAYMENT: 'ON_PAYMENT',
  TIMED: 'TIMED',
  VALUE: 'VALUE',
  VIA_INVOICE: 'VIA_INVOICE'
};

export const SalaryPaymentTypeEnum = enumType({
  name: 'SalaryPaymentTypeEnum',
  members: Object.values(salaryPaymentTypes),
  description: 'Details about when salary needs to be paid for the user'
});
