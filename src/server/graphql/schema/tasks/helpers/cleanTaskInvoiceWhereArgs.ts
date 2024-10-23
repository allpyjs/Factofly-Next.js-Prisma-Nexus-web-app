import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanCustomerWhereArgs from '../../customers/helpers/cleanCustomerWhereArgs';
import cleanInvoiceStatusFilter from '../../invoices/helpers/cleanInvoiceStatusFilter';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';
import cleanJobTypeWhereArgs from '../../jobTypes/helpers/cleanJobTypeWhereArgs';

export default function cleanInvoiceWhereArgs(
  where: NexusGenInputs['InvoiceWhereInputArgs'] | null | undefined
): Prisma.InvoiceWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  return {
    id: cleanNumberFilter(where.id),
    active: cleanBooleanFilter(where.active),
    customer: cleanCustomerWhereArgs(where.customer),
    endDate: cleanDateTimeFilter(where.endDate),
    currency: cleanStringFilter(where.currency),
    reference: cleanStringFilter(where.reference),
    startDate: cleanDateTimeFilter(where.startDate),
    invoiceDate: cleanDateTimeFilter(where.invoiceDate),
    status: cleanInvoiceStatusFilter(where.status),
    termsAccepted: cleanBooleanFilter(where.termsAccepted),
    vacationPayment: cleanBooleanFilter(where.vacationPayment),
    includeVat: cleanBooleanFilter(where.includeVat),
    jobType: cleanJobTypeWhereArgs(where.jobType),
    paymentDueDays: cleanNumberFilter(where.paymentDueDays) as Prisma.IntFilter,
    hoursWorked: cleanNumberFilter(where.hoursWorked) as Prisma.IntFilter,
    // user: cleanUserWhereArgs(where.user),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate)
  };
}
