import { ApolloError } from 'apollo-server-core';
import { rule } from 'graphql-shield';
import apiConfig from '../../../apiConfig';
import logger from '../../../utils/logger';
import { GraphQLContext } from '../context';

const debug = apiConfig.graphql.debugPermissions;

// TODO use scopes.
const rules = {
  model: {
    isContentOwner: rule({ cache: 'no_cache' })(async (parent, args, context: GraphQLContext) => {
      const { user } = context;
      const isContentOwner: boolean = parent && user && parent.userId === user.id;

      if (debug) {
        logger.info(`graphql/schema/rules.ts: checking isContentOwner (${isContentOwner})`);
      }

      if (!isContentOwner) {
        return new ApolloError('Only the owner of this resource may accesss it', 'FORBIDDEN');
      }

      return isContentOwner;
    }),
    isUser: rule({ cache: 'no_cache' })(async (parent, args, context: GraphQLContext) => {
      const { user } = context;
      const isUser: boolean = parent.id === user?.id;

      if (debug) {
        logger.info(`graphql/schema/rules.ts: checking isUser (${isUser})`);
      }

      if (!isUser) {
        return new ApolloError('Only users are able in order to access this resource', 'FORBIDDEN');
      }

      return isUser;
    })
  },
  auth: {
    isEmployee: rule({ cache: 'contextual' })(async (parent, args, context: GraphQLContext) => {
      const { user } = context;

      const isEmployee = Boolean(
        user && user.id && user.role && (user.role === 'ADMIN' || user.role === 'EMPLOYEE')
      );

      if (debug) {
        logger.info(`graphql/schema/rules.ts: checking isEmployee (${isEmployee})`);
      }

      if (!isEmployee) {
        return new ApolloError('User must be an employee in order to access this resource', 'FORBIDDEN');
      }

      return isEmployee;
    }),
    isAdmin: rule({ cache: 'contextual' })(async (parent, args, context: GraphQLContext) => {
      const { user } = context;
      const isAdmin = Boolean(user && user.id && user.role === 'ADMIN');

      if (debug) {
        logger.info(`graphql/schema/rules.ts: checking isAdmin (${isAdmin})`);
      }

      if (!isAdmin) {
        return new ApolloError('User must be an admin in order to access this resource', 'FORBIDDEN');
      }

      return isAdmin;
    }),
    isAuthenticatedUser: rule({ cache: 'contextual' })(async (parent, args, context: GraphQLContext) => {
      const { user } = context;
      const isAuthenticatedUser = !!user?.id && user.emailVerified;

      if (debug) {
        logger.info(`graphql/schema/rules.ts: checking isAuthenticatedUser (${isAuthenticatedUser})`, {
          active: user?.active
        });
      }

      if (!isAuthenticatedUser) {
        return new ApolloError(
          'User must be authenticated and verified in order to access this resource',
          'FORBIDDEN'
        );
      }

      return isAuthenticatedUser;
    }),
    isUser: rule({ cache: 'contextual' })(async (parent, args, context: GraphQLContext) => {
      const { user } = context;
      const isUser = !!user?.id;

      if (debug) {
        logger.info(`graphql/schema/rules.ts: checking isUser (${isUser})`);
      }

      if (!isUser) {
        return new ApolloError('User must be authenticated in order to access this resource', 'FORBIDDEN');
      }

      return isUser;
    })
  }
};

export default rules;
