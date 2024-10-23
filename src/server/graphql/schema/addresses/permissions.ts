import { or, rule } from 'graphql-shield';
import logger from '../../../../utils/logger';
import prismaClient from '../../../utils/prismaClient';
import rules from '../rules';
import apiConfig from '../../../../apiConfig';
import { GraphQLContext } from '../../context';

const debug = apiConfig.graphql.debugPermissions;

const isAddressOwner = rule({
  cache: 'no_cache'
})(async (parent, args, context: GraphQLContext) => {
  let address;
  if (parent.customers && parent.users) {
    address = parent;
  } else {
    address = await prismaClient.address.findUnique({
      where: { id: parent.id },
      include: { customers: { select: { userId: true } }, users: { select: { id: true } } }
    });
  }

  if (!address) return false;

  const ruleResult =
    address.customers.some((x: any) => x.userId === context.user?.id) ||
    address.users.some((x: any) => x.id === context.user?.id);

  if (debug) {
    logger.info(`graphql/schema/addresses/permissions.ts: checking isAddressOwner (${ruleResult})`);
  }

  return ruleResult;
});

export default {
  Address: or(rules.auth.isEmployee, isAddressOwner)
};
