import { makeExecutableSchema } from 'graphql-tools';

import { schema } from './schema';
import { resolverMap } from './resolvers';

export { createLoaders } from './loaders';
export { Context } from './types';


export const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolverMap,
});
