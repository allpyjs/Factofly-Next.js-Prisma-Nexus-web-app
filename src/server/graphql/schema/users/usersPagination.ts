import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import { Context } from '~/server/graphql/context';
import cleanUserWhereArgs from './helpers/cleanUserWhereArgs';
import { NexusGenArgTypes } from '~/server/graphql/.generated/nexus-typegen';
import { cursorFromNode, getInfoFromCursor, getInfoFromDecodedCursor } from '../shared/utils/cursor';
import cleanUserOrder from './helpers/cleanUserOrder';

const totalCount = async (
  root: SourceValue<'Query'>,
  args: ArgsValue<'Query', 'totalCount'>,
  context: Context
) => context.prisma.user.count({ where: { ...cleanUserWhereArgs(args.where) } });

const nodes = async (
  root: SourceValue<'Query'>,
  args: NexusGenArgTypes['Query']['users'],
  context: GetGen<'context'>
) =>
  context.prisma.user.findMany({
    where: { ...cleanUserWhereArgs(args.where) },
    take: args?.first || undefined,
    cursor: args?.after
      ? {
          id: getInfoFromDecodedCursor(args?.after).id
        }
      : undefined,
    orderBy: cleanUserOrder(args.orderBy),
    skip: args?.after ? 1 : args?.skip ?? undefined,
    include: {
      addresses: { include: { customers: { select: { userId: true } }, users: { select: { id: true } } } }
    }
  });

const pageInfoFromNodes = async (
  root: SourceValue<'Query'>,
  args: NexusGenArgTypes['Query']['users'],
  context: GetGen<'context'>
) => {
  const count = await context.prisma.user.count({ where: { ...cleanUserWhereArgs(args.where) } });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function usersPagination(t: OutputDefinitionBlock<'Query'>): void {
  t.nonNull.connectionField('users', {
    nonNullDefaults: { output: true },
    type: 'User',
    additionalArgs: {
      orderBy: arg({ type: 'UserOrderByInputArgs' }),
      where: arg({ type: 'UserWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
