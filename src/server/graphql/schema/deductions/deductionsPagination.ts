import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { GraphQLResolveInfo } from 'graphql';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import cleanDeductionWhereArgs from './helpers/cleanDeductionWhereArgs';
import cleanDeductionOrder from './helpers/cleanDeductionOrder';
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

  return context.prisma.deduction.count({
    where: { ...cleanDeductionWhereArgs({ ...args.where, customer, user }) }
  });
};

const nodes = async (
  root: RootType,
  args: NexusGenArgTypes['Query']['deductions'],
  context: GetGen<'context'>,
  { path }: GraphQLResolveInfo
) => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }

  return context.prisma.deduction.findMany({
    where: {
      ...cleanDeductionWhereArgs({ ...args.where, user })
    },
    take: args?.first || undefined,
    cursor: args?.after
      ? {
          id: getInfoFromDecodedCursor(args?.after).id
        }
      : undefined,
    orderBy: cleanDeductionOrder(args.orderBy),
    skip: args?.after ? 1 : args?.skip
  });
};

const pageInfoFromNodes = async (
  root: RootType,
  args: NexusGenArgTypes['Query']['deductions'],
  context: GetGen<'context'>,
  { path }: GraphQLResolveInfo
) => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }

  const count = await context.prisma.deduction.count({
    where: { ...cleanDeductionWhereArgs({ ...args.where, user }) }
  });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function deductionsPagination(
  t: OutputDefinitionBlock<'Query'> | OutputDefinitionBlock<'User'> | OutputDefinitionBlock<'Customer'>
): void {
  t.nonNull.connectionField('deductions', {
    nonNullDefaults: { output: true },
    type: 'Deduction',
    additionalArgs: {
      orderBy: arg({ type: 'DeductionOrderByInputArgs' }),
      where: arg({ type: 'DeductionWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
