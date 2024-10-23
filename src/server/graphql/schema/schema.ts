import { makeSchema } from 'nexus';
import { join } from 'path';
import { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import permissions from './permissions';
import * as types from './types';
import plugins from './plugins';

const initalSchema = makeSchema({
  types,
  plugins,
  outputs: {
    typegen: join(process.cwd(), 'src/server/graphql/.generated/nexus-typegen.ts'),
    schema: join(process.cwd(), 'src/server/graphql/.generated/schema.graphql')
  }
}) as GraphQLSchema;

const schema = applyMiddleware(initalSchema, permissions);

export default schema;
