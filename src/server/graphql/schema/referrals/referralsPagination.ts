import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import cleanReferralWhereArgs from './helpers/cleanReferralWhereArgs';
import cleanReferralOrder from './helpers/cleanReferralOrder';
import { Context } from '../../context';
import { NexusGenArgTypes } from '../../.generated/nexus-typegen';
import { cursorFromNode, getInfoFromCursor, getInfoFromDecodedCursor } from '../shared/utils/cursor';

type RootType = SourceValue<'Query'> | SourceValue<'User'> | SourceValue<'Customer'>;

const totalCount = async (_: RootType, args: ArgsValue<'Query', 'totalCount'>, context: Context) =>
  context.prisma.referral.count({
    where: { ...cleanReferralWhereArgs({ ...args.where }) }
  });

const nodes = async (
  _: RootType,
  args: NexusGenArgTypes['Query']['referrals'],
  context: GetGen<'context'>
) => {
  const results = await context.prisma.referral.findMany({
    where: {
      ...cleanReferralWhereArgs({ ...args.where })
    },
    take: args?.first || undefined,
    cursor: args?.after
      ? {
          id: getInfoFromDecodedCursor(args?.after).id
        }
      : undefined,
    orderBy: cleanReferralOrder(args.orderBy),
    skip: args?.after ? 1 : args?.skip
  });
  return results;
};

const pageInfoFromNodes = async (
  _: RootType,
  args: NexusGenArgTypes['Query']['referrals'],
  context: GetGen<'context'>
) => {
  const count = await context.prisma.referral.count({
    where: { ...cleanReferralWhereArgs({ ...args.where }) }
  });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function referralsPagination(
  t: OutputDefinitionBlock<'Query'> | OutputDefinitionBlock<'User'> | OutputDefinitionBlock<'Customer'>
): void {
  t.nonNull.connectionField('referrals', {
    nonNullDefaults: { output: true },
    type: 'Referral',
    additionalArgs: {
      orderBy: arg({ type: 'ReferralOrderByInputArgs' }),
      where: arg({ type: 'ReferralWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
