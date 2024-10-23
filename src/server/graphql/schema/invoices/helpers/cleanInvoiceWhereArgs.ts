import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanCustomerWhereArgs from '../../customers/helpers/cleanCustomerWhereArgs';
import cleanInvoiceStatusFilter from './cleanInvoiceStatusFilter';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';
import cleanJobTypeWhereArgs from '../../jobTypes/helpers/cleanJobTypeWhereArgs';
import cleanTaskWhereArgs from '../../tasks/helpers/cleanTaskWhereArgs';
import cleanUserWhereArgs from '../../users/helpers/cleanUserWhereArgs';

export default function cleanInvoiceWhereArgs(
  where: NexusGenInputs['InvoiceWhereInputArgs'] | null | undefined
): Prisma.InvoiceWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  let filter: Prisma.InvoiceWhereInput = {
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
    task: cleanTaskWhereArgs(where.task),
    paymentDueDays: cleanNumberFilter(where.paymentDueDays) as Prisma.IntFilter,
    hoursWorked: cleanNumberFilter(where.hoursWorked) as Prisma.IntFilter,
    user: cleanUserWhereArgs(where.user),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate),
    salaryId: cleanNumberFilter(where.salaryId)
  };

  if (where.query) {
    const queryFields: Prisma.InvoiceWhereInput[] = [
      { reference: { contains: where.query, mode: 'insensitive' } },
      { customer: { name: { contains: where.query, mode: 'insensitive' } } },
      { customerName: { contains: where.query, mode: 'insensitive' } },
      {
        user: {
          OR: [
            { firstName: { contains: where.query, mode: 'insensitive' } },
            { lastName: { contains: where.query, mode: 'insensitive' } }
          ]
        }
      }
    ];

    if (!Number.isNaN(Number(where.query.trim()))) {
      queryFields.push({ id: { equals: Number(where.query) } });
      queryFields.push({ visibleId: { equals: Number(where.query) } });
      queryFields.push({ userId: Number(where.query) });
    }

    filter = {
      AND: [
        {
          OR: queryFields
        },
        filter
      ]
    };
  }

  return filter;
}
