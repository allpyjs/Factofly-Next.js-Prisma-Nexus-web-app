import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { GraphQLResolveInfo } from 'graphql';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import cleanTaskWhereArgs from './helpers/cleanTaskWhereArgs';
import cleanTaskOrder from './helpers/cleanTaskOrder';
import { Context } from '~/server/graphql/context';
import { NexusGenArgTypes } from '~/server/graphql/.generated/nexus-typegen';
import { cursorFromNode, getInfoFromCursor, getInfoFromDecodedCursor } from '../shared/utils/cursor';

type RootType = SourceValue<'Query'> | SourceValue<'User'> | SourceValue<'Customer'>;

const totalCount = async (
  root: RootType,
  args: ArgsValue<'Query', 'totalCount'>,
  context: Context,
  { path }: GraphQLResolveInfo
) => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }
  let customer = args.where?.customer || undefined;
  if (path?.typename === 'Customer' && 'id' in root && root.id) {
    customer = { id: { equals: root.id } };
    if ('userId' in root && root.userId) {
      user = { id: { equals: root.userId } };
    }
  }

  return context.prisma.task.count({ where: { ...cleanTaskWhereArgs({ ...args.where, customer, user }) } });
};

const nodes = async (
  root: RootType,
  args: NexusGenArgTypes['Query']['tasks'],
  context: GetGen<'context'>,
  { path }: GraphQLResolveInfo
) => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }
  let customer = args.where?.customer || undefined;
  if (path?.typename === 'Customer' && 'id' in root && root.id) {
    customer = { id: { equals: root.id } };
    if ('userId' in root && root.userId) {
      user = { id: { equals: root.userId } };
    }
  }
  return context.prisma.task.findMany({
    where: {
      ...cleanTaskWhereArgs({ ...args.where, customer, user })
    },
    take: args?.first || undefined,
    cursor: args?.after
      ? {
          id: getInfoFromDecodedCursor(args?.after).id
        }
      : undefined,
    orderBy: cleanTaskOrder(args.orderBy),
    skip: args?.after ? 1 : args?.skip
  });
};

const pageInfoFromNodes = async (
  root: RootType,
  args: NexusGenArgTypes['Query']['tasks'],
  context: GetGen<'context'>,
  { path }: GraphQLResolveInfo
) => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }
  let customer = args.where?.customer || undefined;
  if (path?.typename === 'Customer' && 'id' in root && root.id) {
    customer = { id: { equals: root.id } };
    if ('userId' in root && root.userId) {
      user = { id: { equals: root.userId } };
    }
  }

  const count = await context.prisma.task.count({
    where: { ...cleanTaskWhereArgs({ ...args.where, customer, user }) }
  });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function tasksPagination(
  t: OutputDefinitionBlock<'Query'> | OutputDefinitionBlock<'User'> | OutputDefinitionBlock<'Customer'>
): void {
  t.nonNull.connectionField('tasks', {
    nonNullDefaults: { output: true },
    type: 'Task',
    additionalArgs: {
      orderBy: arg({ type: 'TaskOrderByInputArgs' }),
      where: arg({ type: 'TaskWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
