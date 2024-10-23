import { ApolloServer } from 'apollo-server-micro';
import schema from './schema';
import context from './context';
import { LoggingPlugin } from './plugins/LoggingPlugin';
import logger from '~/utils/logger';
import dataSources from './datasources';
import { SetHttpStatusCodesPlugin } from './plugins/SetHttpStatusCodesPlugin';

logger.info('apolloServer.ts: Starting Apollo Server...');

const apolloServer = new ApolloServer({
  context,
  schema,
  dataSources,
  csrfPrevention: true,
  plugins: [LoggingPlugin, SetHttpStatusCodesPlugin]
});

export default apolloServer;
