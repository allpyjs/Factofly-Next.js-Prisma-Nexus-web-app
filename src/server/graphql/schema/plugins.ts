import { ApolloError } from 'apollo-server-core';
import { connectionPlugin, queryComplexityPlugin, nullabilityGuardPlugin, fieldAuthorizePlugin } from 'nexus';
import { FieldAuthorizePluginErrorConfig } from 'nexus/dist/plugins/fieldAuthorizePlugin';
import logger from '../../../utils/logger';

const plugins = [
  nullabilityGuardPlugin({
    onGuarded({ info }) {
      logger.error(
        new Error(`Error: Saw a null value for non-null field ${info.parentType.name}.${info.fieldName}`)
      );
    },
    fallbackValues: {
      Int: () => 0,
      String: () => '',
      ID: ({ info }) => `${info.parentType.name}:N/A`,
      Boolean: () => false,
      Float: () => 0,
      DateTime: () => '',
      JSON: () => '',
      BigInt: () => 0,
      Decimal: () => 0,
      Void: () => ''
    }
  }),
  queryComplexityPlugin(),
  fieldAuthorizePlugin({
    formatError: ({ error }: FieldAuthorizePluginErrorConfig): Error => {
      if (error instanceof ApolloError) {
        return error;
      }

      const err: Error & { originalError?: Error } = new Error('Not authorized');
      err.originalError = error;
      return err;
    }
  }),
  connectionPlugin({
    extendConnection: {
      totalCount: { type: 'Int' }
    },
    disableBackwardPagination: true,
    includeNodesField: true
  })
];

export default plugins;
