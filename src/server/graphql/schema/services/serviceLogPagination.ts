import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import { Context } from '~/server/graphql/context';
import cleanServiceLogWhereArgs from './helpers/cleanServiceLogWhereArgs';
import { NexusGenArgTypes } from '~/server/graphql/.generated/nexus-typegen';
import { cursorFromNode, getInfoFromCursor, getInfoFromDecodedCursor } from '../shared/utils/cursor';
import cleanServiceLogOrder from './helpers/cleanServiceLogOrder';

const totalCount = async (
  root: SourceValue<'Query'>,
  args: ArgsValue<'Query', 'totalCount'>,
  context: Context
) => context.prisma.serviceLog.count({ where: { ...cleanServiceLogWhereArgs(args.where) } });

const nodes = async (
  root: SourceValue<'Query'>,
  args: NexusGenArgTypes['Query']['serviceLogs'],
  context: GetGen<'context'>
) =>
  context.prisma.serviceLog.findMany({
    where: { ...cleanServiceLogWhereArgs(args.where) },
    take: args?.first || undefined,
    cursor: args?.after
      ? {
          id: getInfoFromDecodedCursor(args?.after).id
        }
      : undefined,
    orderBy: cleanServiceLogOrder(args.orderBy),
    skip: args?.after ? 1 : args?.skip
  });

const pageInfoFromNodes = async (
  root: SourceValue<'Query'>,
  args: NexusGenArgTypes['Query']['serviceLogs'],
  context: GetGen<'context'>
) => {
  const count = await context.prisma.serviceLog.count({ where: { ...cleanServiceLogWhereArgs(args.where) } });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function serviceLogsPagination(t: OutputDefinitionBlock<'Query'>): void {
  t.nonNull.connectionField('serviceLogs', {
    nonNullDefaults: { output: true },
    type: 'ServiceLog',
    additionalArgs: {
      orderBy: arg({ type: 'ServiceLogOrderByInputArgs' }),
      where: arg({ type: 'ServiceLogWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
