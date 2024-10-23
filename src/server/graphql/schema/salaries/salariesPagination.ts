import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { GraphQLResolveInfo } from 'graphql';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import cleanSalaryWhereArgs from './helpers/cleanSalaryWhereArgs';
import cleanSalaryOrder from './helpers/cleanSalaryOrder';
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

  return context.prisma.salary.count({
    where: { ...cleanSalaryWhereArgs({ ...args.where, customer, user }) }
  });
};

const nodes = async (
  root: RootType,
  args: NexusGenArgTypes['Query']['salaries'],
  context: GetGen<'context'>
) => {
  const result = await context.prisma.salary.findMany({
    where: {
      ...cleanSalaryWhereArgs({ ...args.where })
    },
    take: args?.first || undefined,
    include: {
      user: true,
      invoices: true,
      deductions: true
    },
    cursor: args?.after
      ? {
          id: getInfoFromDecodedCursor(args?.after).id
        }
      : undefined,
    orderBy: cleanSalaryOrder(args.orderBy),
    skip: args?.after ? 1 : args?.skip
  });
  return result;
};

const pageInfoFromNodes = async (
  root: RootType,
  args: NexusGenArgTypes['Query']['salaries'],
  context: GetGen<'context'>
) => {
  const count = await context.prisma.salary.count({
    where: { ...cleanSalaryWhereArgs({ ...args.where }) }
  });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function salarysPagination(
  t: OutputDefinitionBlock<'Query'> | OutputDefinitionBlock<'User'> | OutputDefinitionBlock<'Customer'>
): void {
  t.nonNull.connectionField('salaries', {
    nonNullDefaults: { output: true },
    type: 'Salary',
    additionalArgs: {
      orderBy: arg({ type: 'SalaryOrderByInputArgs' }),
      where: arg({ type: 'SalaryWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
