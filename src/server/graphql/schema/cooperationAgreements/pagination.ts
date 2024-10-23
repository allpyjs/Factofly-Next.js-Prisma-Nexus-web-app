import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { GraphQLResolveInfo } from 'graphql';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import cleanCooperationAgreementWhereArgs from './helpers/cleanCooperationAgreementWhereArgs';
import cleanCooperationAgreementOrder from './helpers/cleanCooperationAgreementOrder';
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

  return context.prisma.cooperationAgreement.count({
    where: { ...cleanCooperationAgreementWhereArgs({ ...args.where, customer, user }) }
  });
};

const nodes = async (
  root: RootType,
  args: NexusGenArgTypes['Query']['cooperationAgreements'],
  context: GetGen<'context'>,
  { path }: GraphQLResolveInfo
) => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }

  return context.prisma.cooperationAgreement.findMany({
    where: {
      ...cleanCooperationAgreementWhereArgs({ ...args.where, user })
    },
    take: args?.first || undefined,
    cursor: args?.after
      ? {
          id: getInfoFromDecodedCursor(args?.after).id
        }
      : undefined,
    orderBy: cleanCooperationAgreementOrder(args.orderBy),
    skip: args?.after ? 1 : args?.skip
  });
};

const pageInfoFromNodes = async (
  root: RootType,
  args: NexusGenArgTypes['Query']['cooperationAgreements'],
  context: GetGen<'context'>,
  { path }: GraphQLResolveInfo
) => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }

  const count = await context.prisma.cooperationAgreement.count({
    where: { ...cleanCooperationAgreementWhereArgs({ ...args.where, user }) }
  });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function cooperationAgreementsPagination(
  t: OutputDefinitionBlock<'Query'> | OutputDefinitionBlock<'User'> | OutputDefinitionBlock<'Customer'>
): void {
  t.nonNull.connectionField('cooperationAgreements', {
    nonNullDefaults: { output: true },
    type: 'CooperationAgreement',
    additionalArgs: {
      orderBy: arg({ type: 'CooperationAgreementOrderByInputArgs' }),
      where: arg({ type: 'CooperationAgreementWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
