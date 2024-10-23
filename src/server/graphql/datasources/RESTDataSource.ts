import { Response, RESTDataSource as ApolloRESTDataSource } from 'apollo-datasource-rest';
import { ApolloError } from 'apollo-server-core';
import logger from '~/utils/logger';
import { IContextData } from '../IContextData';

export default class RESTDataSource extends ApolloRESTDataSource<IContextData> {
  protected async errorFromResponse(response: Response): Promise<ApolloError> {
    const error = await super.errorFromResponse(response);
    if (error?.extensions?.response?.body) {
      try {
        const message = `RESTSource error: ${JSON.stringify(error.extensions.response.body, null, 2)}`;
        logger.error(new Error(message));
      } catch (e) {
        logger.error(e as Error);
      }
    }

    return error;
  }
}
