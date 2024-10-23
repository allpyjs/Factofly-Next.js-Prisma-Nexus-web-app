import { GetGen } from 'nexus/dist/core';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import cleanCustomerCreateArgs from '../../customers/helpers/cleanCustomerCreateArgs';

export default async function cleanTaskCreateArgs(
  data: NexusGenInputs['TaskCreateInputArgs'],
  context: GetGen<'context'>,
  userId: bigint | number
): Promise<Prisma.TaskCreateInput> {
  //   const task = await context.prisma.task.findFirst({
  //     select: { visibleId: true },
  //     where: { user: { id: userId } },
  //     orderBy: { visibleId: 'desc' }
  //   });
  let customer;
  if (data.customer?.create) {
    customer = await context.prisma.customer.create({
      data: await cleanCustomerCreateArgs(data.customer.create, context, userId),
      include: { address: true, user: true }
    });

    // sendEvent(topics.CREATE_CUSTOMER, createEventData(customer), context.pubSub);
  }

  return {
    customer: {
      connect: data.customer?.connect || (customer && { id: customer.id }) || undefined
    },
    endDate: data.endDate,
    expectedHours: data.expectedHours,
    jobType: data.jobType,
    reference: data.reference,
    startDate: data.startDate,
    status: data.status,
    termsAccepted: data.termsAccepted,
    title: data.title,
    description: data.description,
    paymentAmount: data.paymentAmount,
    paymentType: data.paymentType,
    user: {
      connect: {
        id: userId
      }
    }
  };
}
