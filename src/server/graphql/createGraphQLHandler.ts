import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
// import logger from '~/utils/logger';
// import durationInMs from '../utils/durationInMs';
import apolloServer from './apolloServer';

const startServer = apolloServer.start();

const handlerPromise = startServer.then(() =>
  apolloServer.createHandler({
    path: '/api/graphql'
  })
);

const createGraphQLHandler = async (req: MicroRequest, res: ServerResponse) => {
  // const start = process.hrtime.bigint();
  const handler = await handlerPromise;
  await handler(req, res);

  // const end = process.hrtime.bigint();
  // logger.info(`createGraphQLHandler.ts: handler created in ${durationInMs(start, end)}ms`);
};

export default createGraphQLHandler;

// import { MicroRequest } from 'apollo-server-micro/dist/types';
// import { ServerResponse } from 'http';
// import apolloServer from './apolloServer';

// const startServer = apolloServer.start();

// const createGraphQLHandler = async (req: MicroRequest, res: ServerResponse, path: string) => {
//   await startServer;
//   await apolloServer.createHandler({
//     path
//   })(req, res);
// };

// export default createGraphQLHandler;
