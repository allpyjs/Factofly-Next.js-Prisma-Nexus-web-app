import { GetGen } from 'nexus/dist/core';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanCustomerCreateArgs from '../../customers/helpers/cleanCustomerCreateArgs';

export default async function cleanTaskUpdateArgs(
  data: NexusGenInputs['TaskUpdateInputArgs'],
  context: GetGen<'context'>,
  userId: bigint
): Promise<Prisma.TaskUpdateInput> {
  let customer;
  if (data.customer?.create) {
    customer = await context.prisma.customer.create({
      data: await cleanCustomerCreateArgs(data.customer.create, context, userId),
      include: { address: true, user: true }
    });

    //    sendEvent(topics.CREATE_CUSTOMER, createEventData(customer), context.pubSub);
  }

  return {
    active: data.active ?? undefined,
    customer: {
      connect: customer
        ? {
            id: customer.id
          }
        : data.customer?.connect || undefined
    },
    endDate: data.endDate,
    expectedHours: data.expectedHours ?? undefined,
    jobType: data.jobType ?? undefined,
    reference: data.reference,
    startDate: data.startDate,
    status: data.status ?? undefined,
    termsAccepted: data.termsAccepted ?? undefined,
    title: data.title ?? undefined,
    updatedDate: new Date(),
    description: data.description ?? undefined,
    paymentAmount: data.paymentAmount ?? undefined,
    paymentType: data.paymentType ?? undefined
  };
}
