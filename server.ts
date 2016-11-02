import 'babel-polyfill';
import Hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';

import { executableSchema as usersSchema, createLoaders, Context } from './data';
import './firebase';


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
    graphqlOptions: (request: Context) => {
      console.log('='.repeat(80));
      request.loaders = createLoaders();
      return {
        schema: usersSchema,
        context: request,
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
