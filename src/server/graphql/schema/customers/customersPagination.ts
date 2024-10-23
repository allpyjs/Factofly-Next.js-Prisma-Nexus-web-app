import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { GraphQLResolveInfo } from 'graphql';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import { Customer } from '@prisma/client';
import { Context } from '../../context';
import { cursorFromNode, getInfoFromCursor, getInfoFromDecodedCursor } from '../shared/utils/cursor';
import { NexusGenArgTypes } from '../../.generated/nexus-typegen';
import cleanCustomerWhereArgs from './helpers/cleanCustomerWhereArgs';
import { cleanCustomerOrder } from './helpers/cleanCustomerOrder';
import { IContextData } from '../../IContextData';

type RootValue = SourceValue<'Query'> | SourceValue<'User'>;

const totalCount = async (
  root: RootValue,
  args: ArgsValue<'Query', 'totalCount'>,
  context: Context,
  { path }: GraphQLResolveInfo
): Promise<number> => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }

  return (
    context.prisma.customer.count({
      where: { ...cleanCustomerWhereArgs({ ...args.where, user }), parentId: null }
    }) || 0
  );
};

const nodes = async (
  root: RootValue,
  args: NexusGenArgTypes['Query']['customers'],
  context: IContextData,
  { path }: GraphQLResolveInfo
): Promise<Customer[]> => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }

  return (
    context.prisma.customer.findMany({
      where: {
        ...cleanCustomerWhereArgs({ ...args.where, user }),
        parentId: null
      },
      take: args?.first || undefined,
      cursor: args?.after
        ? {
            id: getInfoFromDecodedCursor(args?.after).id
          }
        : undefined,
      orderBy: cleanCustomerOrder(args.orderBy),
      skip: args?.after ? 1 : args?.skip ?? undefined,
      include: {
        addresses: {
          include: { country: true, customers: { select: { userId: true } }, users: { select: { id: true } } }
        },
        user: true
      }
    }) || []
  );
};

const pageInfoFromNodes = async (
  root: RootValue,
  args: NexusGenArgTypes['Query']['customers'],
  context: GetGen<'context'>,
  { path }: GraphQLResolveInfo
) => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }

  const count = await context.prisma.customer.count({
    where: { ...cleanCustomerWhereArgs({ ...args.where, user }), parentId: null }
  });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function customersPagination(
  t: OutputDefinitionBlock<'Query'> | OutputDefinitionBlock<'User'>
): void {
  t.nonNull.connectionField('customers', {
    nonNullDefaults: { output: true },
    type: 'Customer',
    additionalArgs: {
      orderBy: arg({ type: 'CustomerOrderByInputArgs' }),
      where: arg({ type: 'CustomerWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
