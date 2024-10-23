import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { GraphQLResolveInfo } from 'graphql';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import { Context } from '~/server/graphql/context';
import cleanInvoiceWhereArgs from './helpers/cleanInvoiceWhereArgs';
import { NexusGenArgTypes } from '~/server/graphql/.generated/nexus-typegen';
import { cursorFromNode, getInfoFromCursor, getInfoFromDecodedCursor } from '../shared/utils/cursor';
import cleanInvoiceOrder from './helpers/cleanInvoiceOrder';
import { IContextData } from '../../IContextData';

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

  return context.prisma.invoice.count({
    where: { ...cleanInvoiceWhereArgs({ ...args.where, customer, user }) }
  });
};

const nodes = async (
  root: SourceValue<'Query'> | SourceValue<'User'> | SourceValue<'Customer'>,
  args: NexusGenArgTypes['Query']['invoices'],
  context: IContextData,
  info: GraphQLResolveInfo
) => {
  // console.log('--------------', {
  //   InvoiceListItem: info.fragments.InvoiceFragment.selectionSet.selections.map((x: any) => x.name)
  // });

  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (info.path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }
  let customer = args.where?.customer || undefined;
  if (info.path?.typename === 'Customer' && 'id' in root && root.id) {
    customer = { id: { equals: root.id } };
    if ('userId' in root && root.userId) {
      user = { id: { equals: root.userId } };
    }
  }

  const results = await context.prisma.invoice.findMany({
    where: {
      ...cleanInvoiceWhereArgs({ ...args.where, customer, user })
    },
    take: args?.first || undefined,
    cursor: args?.after
      ? {
          id: getInfoFromDecodedCursor(args?.after).id
        }
      : undefined,
    orderBy: cleanInvoiceOrder(args.orderBy),
    skip: args?.after ? 1 : args?.skip ?? undefined,
    include: {
      user: true,
      lines: true,
      task: true,
      jobType: true,
      customer: {
        include: {
          addresses: {
            include: {
              customers: { select: { userId: true } },
              users: { select: { id: true } }
            }
          }
        }
      }
    }
  });
  return results;
};

const pageInfoFromNodes = async (
  root: SourceValue<'Query'> | SourceValue<'User'> | SourceValue<'Customer'>,
  args: NexusGenArgTypes['Query']['invoices'],
  context: GetGen<'context'>,
  info: GraphQLResolveInfo
) => {
  // Use user id from nested parents.
  let user = args.where?.user || undefined;
  if (info.path?.typename === 'User' && 'id' in root && root.id) {
    user = { id: { equals: root.id } };
  }
  let customer = args.where?.customer || undefined;
  if (info.path?.typename === 'Customer' && 'id' in root && root.id) {
    customer = { id: { equals: root.id } };
    if ('userId' in root && root.userId) {
      user = { id: { equals: root.userId } };
    }
  }

  const count = await context.prisma.invoice.count({
    where: { ...cleanInvoiceWhereArgs({ ...args.where, customer, user }) }
  });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function invoicesPagination(
  t: OutputDefinitionBlock<'Query'> | OutputDefinitionBlock<'User'> | OutputDefinitionBlock<'Customer'>
): void {
  t.nonNull.connectionField('invoices', {
    nonNullDefaults: { output: true },
    type: 'Invoice',
    additionalArgs: {
      orderBy: arg({ type: 'InvoiceOrderByInputArgs' }),
      where: arg({ type: 'InvoiceWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
