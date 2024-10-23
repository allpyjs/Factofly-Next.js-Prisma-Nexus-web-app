import { inputObjectType } from 'nexus';

export const UserUpdateInputArgs = inputObjectType({
  name: 'UserUpdateInputArgs',
  definition(t) {
    t.string('language');
    t.string('unit');
    t.string('currency');
    t.field('jobType', { type: 'ConnectDisconnectUniqueInputArgs' });

    t.string('firstName');
    t.string('lastName');
    t.string('email');
    t.string('phoneNumber');

    t.field('salaryPaymentType', { type: 'SalaryPaymentTypeEnum' });
    t.float('salaryPaymentValue');
    t.int('salaryPaymentDay');
    t.float('baseRate');
    t.boolean('vacationPayment');

    t.string('address');
    t.string('city');
    t.string('postalCode');
    t.BigInt('countryId');

    t.string('userSpecifiedReferral');
    t.string('freelancerSituation');

    t.string('bankName');
    t.string('bankAccount');
    t.string('bankRegistration');

    t.boolean('accountSetupComplete');

    t.string('personId');
    t.field('taxCard', { type: 'TaxCardEnum' });
  }
});

export default UserUpdateInputArgs;
