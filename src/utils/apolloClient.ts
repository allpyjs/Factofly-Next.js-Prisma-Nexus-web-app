/* eslint-disable global-require */
// based off https://github.com/vercel/next.js/blob/canary/examples/api-routes-apollo-server-and-client-auth/apollo/client.js

import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject, from } from '@apollo/client';
import merge from 'ts-deepmerge';
import { nanoid } from 'nanoid';
import * as Sentry from '@sentry/nextjs';
import { setContext } from '@apollo/client/link/context';
import isServer from './isServer';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createIsomorphLink() {
  if (isServer()) {
    // const { SchemaLink } = require('@apollo/client/link/schema');

    // TODO: this doesn't seem to be resolving, so figure out why...
    // const { schema } = require('../graphql/schema');

    // logger.error({
    //   msg: `apolloClient.ts: using the apollo client on the server is not currently implemented`
    // });
    return from([]);

    // return new SchemaLink({ schema });
  }
  const { HttpLink } = require('@apollo/client/link/http');
  const { onError } = require('@apollo/client/link/error');

  const setRequestId = setContext(() => ({
    headers: { 'x-request-id': nanoid() }
  }));

  const errorLink = onError(({ graphQLErrors, networkError, operation }: any) => {
    Sentry.configureScope((scope: any) => {
      scope.setTag('request_id', operation.getContext().headers['x-request-id']);
    });
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }: any) =>
        Sentry.captureException(
          new Error(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
          )
        )
      );
    if (networkError) {
      Sentry.captureException(new Error(`[network error]: ${operation} - ${networkError}`));
    }
  });

  const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin'
  });

  return from([setRequestId, errorLink, httpLink]);
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServer(),
    link: createIsomorphLink(),
    cache: new InMemoryCache()
  });
}

export function initializeApollo(initialState = null) {
  const newApolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = newApolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    newApolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return newApolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = newApolloClient;

  return newApolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
