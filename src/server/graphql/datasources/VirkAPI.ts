import { RequestOptions } from 'apollo-datasource-rest';
import apiConfig from '../../../apiConfig';
import RESTDataSource from './RESTDataSource';
import VirkApiResult from './VirkApiResult';

export default class VirkApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = apiConfig.virkApi.baseUrl;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Basic ${apiConfig.virkApi.token}`);
    request.headers.set('Content-Type', 'application/json');
  }

  async search(query: string): Promise<VirkApiResult[]> {
    return this.post('/cvr-permanent/virksomhed/_search', {
      query: {
        multi_match: {
          query,
          type: 'phrase_prefix',
          fields: ['Vrvirksomhed.cvrNummer', 'Vrvirksomhed.virksomhedMetadata.nyesteNavn.navn']
        }
      }
    }).then((x) => x?.hits?.hits ?? []);
  }
}
