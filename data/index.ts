import { makeExecutableSchema } from 'graphql-tools';

import { schema } from './schema';
import { resolverMap } from './resolvers';


export const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolverMap,
});
