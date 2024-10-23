import { OutputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks';
import { ArgsValue, GetGen, SourceValue } from 'nexus/dist/typegenTypeHelpers';
import { arg } from 'nexus';
import { Context } from '~/server/graphql/context';
import cleanAuditWhereArgs from './helpers/cleanAuditWhereArgs';
import { NexusGenArgTypes } from '~/server/graphql/.generated/nexus-typegen';
import { cursorFromNode, getInfoFromCursor, getInfoFromDecodedCursor } from '../shared/utils/cursor';
import cleanAuditOrder from './helpers/cleanAuditOrder';

const totalCount = async (
  root: SourceValue<'Query'>,
  args: ArgsValue<'Query', 'totalCount'>,
  context: Context
) => context.prisma.audit.count({ where: { ...cleanAuditWhereArgs(args.where) } });

const nodes = async (
  root: SourceValue<'Query'>,
  args: NexusGenArgTypes['Query']['audits'],
  context: GetGen<'context'>
) =>
  context.prisma.audit.findMany({
    where: { ...cleanAuditWhereArgs(args.where) },
    take: args?.first || undefined,
    cursor: args?.after
      ? {
          id: getInfoFromDecodedCursor(args?.after).id
        }
      : undefined,
    orderBy: cleanAuditOrder(args.orderBy),
    skip: args?.after ? 1 : args?.skip
  });

const pageInfoFromNodes = async (
  root: SourceValue<'Query'>,
  args: NexusGenArgTypes['Query']['audits'],
  context: GetGen<'context'>
) => {
  const count = await context.prisma.audit.count({ where: { ...cleanAuditWhereArgs(args.where) } });
  const afterIndex = (args?.after && getInfoFromCursor(args.after).index) || 0;
  return {
    hasPreviousPage: !!args?.after,
    hasNextPage: !(nodes.length < args.first) || afterIndex + nodes.length < count
  };
};

export default function auditsPagination(t: OutputDefinitionBlock<'Query'>): void {
  t.nonNull.connectionField('audits', {
    nonNullDefaults: { output: true },
    type: 'Audit',
    additionalArgs: {
      orderBy: arg({ type: 'AuditOrderByInputArgs' }),
      where: arg({ type: 'AuditWhereInputArgs' }),
      skip: arg({ type: 'Int' })
    },
    totalCount,
    nodes,
    cursorFromNode,
    pageInfoFromNodes
  });
}
