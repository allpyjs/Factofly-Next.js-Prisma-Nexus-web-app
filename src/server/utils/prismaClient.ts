import { PrismaClient, Prisma, User } from '@prisma/client';
import { format } from 'sql-formatter';
import logger from '../../utils/logger';
import apiConfig from '../../apiConfig';
import durationInMs from './durationInMs';

const prismaClientPropertyName = `__prevent-name-collision__prisma`;
type GlobalThisWithPrismaClient = typeof globalThis & {
  [prismaClientPropertyName]: PrismaClient;
};

const createClient = () => {
  const client = new PrismaClient({
    log: [
      { level: 'warn', emit: 'event' },
      { level: 'info', emit: 'event' },
      { level: 'error', emit: 'event' },
      { level: 'query', emit: 'event' }
    ]
  });
  client.$on('info', logger.info);
  client.$on('warn', logger.warn);
  client.$on('error', logger.error);
  if (apiConfig.prisma.logQuery) {
    client.$on('query', async (e: Prisma.QueryEvent) => {
      let formattedQuery = format(e.query);
      if (apiConfig.prisma.logQueryParams) {
        // This will reveal the query params, so only do this in debug
        if (e.params && e.params.length > 0) {
          const params = e.params.substr(1, e.params.length - 2).match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
          if (params) {
            await params.forEach((element: any, i: number) => {
              const token = `$${i + 1}`;
              formattedQuery = formattedQuery.replace(token, element.replace(/"/g, "'"));
            });
          }
        }
      }

      logger.info(`prismaClient.ts: executing SQL query took ${e.duration} ms \n${formattedQuery}`);
      logger.info(`prismaClient.ts: executing SQL query took ${e.duration}ms`);
    });
  }
  if (apiConfig.prisma.logQuery) {
    client.$use(async (params: any, next: any) => {
      const start = process.hrtime.bigint();

      const { model, action } = params;
      const description = [model, action].filter(Boolean).join('.');

      const result = await next(params);
      const end = process.hrtime.bigint();

      logger.info(`prismaClient.ts: query ${description} took ${durationInMs(start, end)}ms`);

      return result;
    });
  }
  return client;
};

const getPrismaClient = () => {
  // Prevent hotreload from reinstantiating prisma client https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
  const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
  if (!newGlobalThis[prismaClientPropertyName]) {
    newGlobalThis[prismaClientPropertyName] = createClient();
  }
  return newGlobalThis[prismaClientPropertyName];
};

const prisma = getPrismaClient();

export { PrismaClient, Prisma };
export type { User };
export default prisma;
