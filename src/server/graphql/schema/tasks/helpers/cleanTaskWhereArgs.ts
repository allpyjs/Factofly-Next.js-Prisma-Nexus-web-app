import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanCustomerWhereArgs from '../../customers/helpers/cleanCustomerWhereArgs';
import cleanBooleanFilter from '../../shared/utils/cleanBooleanFilter';
import cleanDateTimeFilter from '../../shared/utils/cleanDateTimeFilter';
import cleanNumberFilter from '../../shared/utils/cleanNumberFilter';
import cleanStringFilter from '../../shared/utils/cleanStringFilter';
import cleanTaskInvoiceWhereArgs from './cleanTaskInvoiceWhereArgs';
import cleanJobTypeWhereArgs from '../../jobTypes/helpers/cleanJobTypeWhereArgs';
import cleanUserWhereArgs from '../../users/helpers/cleanUserWhereArgs';
import cleanTaskStatusFilter from './cleanTaskStatusFilter';

export default function cleanTaskWhereArgs(
  where: NexusGenInputs['TaskWhereInputArgs'] | null | undefined
): Prisma.TaskWhereInput | undefined {
  if (!where) {
    return undefined;
  }

  let filter: Prisma.TaskWhereInput = {
    id: cleanNumberFilter(where.id),
    active: cleanBooleanFilter(where.active),
    customer: cleanCustomerWhereArgs(where.customer),
    endDate: cleanDateTimeFilter(where.endDate),
    expectedHours: cleanNumberFilter(where.expectedHours) as Prisma.IntFilter,
    invoices: {
      // eslint-disable-next-line no-use-before-define
      some: cleanTaskInvoiceWhereArgs(where.invoices?.some),
      // eslint-disable-next-line no-use-before-define
      none: cleanTaskInvoiceWhereArgs(where.invoices?.none),
      // eslint-disable-next-line no-use-before-define
      every: cleanTaskInvoiceWhereArgs(where.invoices?.every)
    },
    jobType: cleanJobTypeWhereArgs(where.jobType),
    reference: cleanStringFilter(where.reference),
    startDate: cleanDateTimeFilter(where.startDate),
    status: cleanTaskStatusFilter(where.status),
    termsAccepted: cleanBooleanFilter(where.termsAccepted),
    title: cleanStringFilter(where.title),
    user: cleanUserWhereArgs(where.user),
    createdDate: cleanDateTimeFilter(where.createdDate),
    updatedDate: cleanDateTimeFilter(where.updatedDate)
  };

  if (where.query) {
    const queryFields: Prisma.TaskWhereInput[] = [
      { title: { contains: where.query, mode: 'insensitive' } },
      { reference: { contains: where.query, mode: 'insensitive' } },
      {
        user: {
          OR: [
            { firstName: { contains: where.query, mode: 'insensitive' } },
            { lastName: { contains: where.query, mode: 'insensitive' } }
          ]
        }
      }
    ];

    if (!Number.isNaN(Number(where.query))) {
      queryFields.push({ id: { equals: Number(where.query) } });
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
