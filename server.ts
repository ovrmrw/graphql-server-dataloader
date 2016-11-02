import 'babel-polyfill';
import Hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';
declare const Zone: any;

import './firebase';
import { executableSchema, createLoaders } from './data';


const server = new Hapi.Server();

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000;

server.connection({
  host: HOST,
  port: PORT,
});


server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: (request: Hapi.Request) => {
      console.log('='.repeat(80));
      return {
        schema: executableSchema,
        context: Object.assign(request, { loaders: createLoaders() }),
      }
    },
    route: {
      cors: true
    }
  },
});


server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
});


server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
