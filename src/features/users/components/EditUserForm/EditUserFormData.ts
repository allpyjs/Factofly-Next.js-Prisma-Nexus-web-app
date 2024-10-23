export type EditUserFormData = {
  id: bigint;
  jobTypeId?: bigint;
  customerCountryId?: bigint;
  unit?: string;
  currency?: string;
  language?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;

  salaryPaymentType?: string;
  salaryPaymentDay?: number;
  salaryPaymentValue?: number;
  baseRate?: number;

  address?: {
    address?: string;
    city?: string;
    postalCode?: string;
    countryId?: bigint;
  };

  bankName?: string;
  bankAccount?: string;
  bankRegistration?: string;

  personId?: string;
  taxCard?: string;

  bankNameHidden?: string;
  bankAccountHidden?: string;
  bankRegistrationHidden?: string;

  personIdHidden?: string;
  taxCardHidden?: string;

  vacationPayment?: boolean;
};
