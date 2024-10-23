import { GraphQLRequestContext } from 'apollo-server-core';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import * as Sentry from '@sentry/nextjs';
import '@sentry/tracing';
import logger from '../../../utils/logger';
import durationInMs from '~/server/utils/durationInMs';

export const LoggingPlugin: ApolloServerPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener | void> {
    const start = process.hrtime.bigint();

    const transaction = Sentry.getCurrentHub()?.getScope()?.getTransaction();
    const requestSpan = transaction?.startChild({
      op: 'db.graphql',
      description: `request ${requestContext.request.operationName}`
    });

    const id = `${
      requestContext.context.requestId ? `requestId=${requestContext.context.requestId}, ` : ``
    }operation=${requestContext.request.operationName}`;

    logger.info(
      `graphql/plugins/LoggingPlugin.ts: ${id} request started at t+${durationInMs(
        requestContext.context.requestStartTime,
        start
      )}ms`
      // {query: requestContext.request.query,
      // variables: requestContext.request.variables}
    );

    return {
      // async parsingDidStart() {
      //   logger.debug(`graphql/plugins/LoggingPlugin.ts: ${id} parsing started`);
      // },

      // async validationDidStart() {
      //   logger.debug(`graphql/plugins/LoggingPlugin.ts: ${id} validation started`);
      // },

      // async didResolveSource() {
      //   logger.debug(`graphql/plugins/LoggingPlugin.ts: ${id} validation started`);
      // },

      // async didResolveOperation() {
      //   logger.debug(`graphql/plugins/LoggingPlugin.ts: ${id} operation resolved`);
      // },

      async executionDidStart() {
        const executionSpan = requestSpan?.startChild({
          op: 'db.graphql',
          description: `execute ${requestContext.request.operationName}`
        });
        return {
          async executionDidEnd() {
            executionSpan?.finish();
          }
          // willResolveField({ info }) {
          //   const fieldSpan = executionSpan?.startChild({
          //     op: 'db.graphql',
          //     description: `resolve field ${info.parentType.name}.${info.fieldName}`
          //   });
          //   return () => {
          //     fieldSpan?.finish();
          //   };
          // }
        };
      },

      async didEncounterErrors(context: GraphQLRequestContext) {
        logger.error({
          msg: `graphql/plugins/LoggingPlugin.ts: ${id} errors encountered`,
          errors: context.errors
        });
        requestSpan?.finish();

        context.errors?.forEach((err) => {
          Sentry.withScope((scope) => {
            if (context.operation) {
              // Annotate whether failing operation was query/mutation/subscription
              scope.setTag('kind', context.operation.operation);
            }

            // Log query and variables as extras (make sure to strip out sensitive data!)
            scope.setExtra('query', context.request.query);
            // scope.setExtra('variables', context.request.variables);

            if (err.path) {
              // We can also add the path as breadcrumb
              scope.addBreadcrumb({
                category: 'query-path',
                message: err.path.join(' > '),
                level: 'debug'
              });
            }

            Sentry.captureException(err);
          });
        });
      },

      async willSendResponse() {
        const end = process.hrtime.bigint();
        requestSpan?.finish();
        logger.info(
          `graphql/plugins/LoggingPlugin.ts: ${id} sending response took ${durationInMs(
            start,
            end
          )}ms at t+${durationInMs(requestContext.context.requestStartTime, end)}ms`
        );
      }
    };
  }
};

export default LoggingPlugin;
