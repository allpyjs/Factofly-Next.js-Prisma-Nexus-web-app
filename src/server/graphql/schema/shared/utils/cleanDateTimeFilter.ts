import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';

export default function cleanDateTimeFilter(
  dateTimeData: NexusGenInputs['DateTimeFilter'] | null | undefined
): Prisma.DateTimeFilter | undefined {
  if (!dateTimeData) {
    return undefined;
  }

  return {
    equals: dateTimeData.equals ? new Date(dateTimeData.equals) : undefined,
    gt: dateTimeData.gt ? new Date(dateTimeData.gt) : undefined,
    gte: dateTimeData.gte ? new Date(dateTimeData.gte) : undefined,
    in: dateTimeData.in ? dateTimeData.in.map((dateTime) => new Date(dateTime)) : undefined,
    lt: dateTimeData.lt ? new Date(dateTimeData.lt) : undefined,
    lte: dateTimeData.lte ? new Date(dateTimeData.lte) : undefined,
    not: dateTimeData.not ? new Date(dateTimeData.not) : undefined,
    notIn: dateTimeData.notIn ? dateTimeData.notIn.map((dateTime) => new Date(dateTime)) : undefined
  };
}
