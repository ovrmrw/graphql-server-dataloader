'use strict';

require('babel-polyfill');

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _graphqlServerHapi = require('graphql-server-hapi');

var _data = require('./data');

require('./firebase');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();
var HOST = 'localhost';
var PORT = 3000;
server.connection({
    host: HOST,
    port: PORT
});
server.register({
    register: _graphqlServerHapi.graphqlHapi,
    options: {
        path: '/graphql',
        graphqlOptions: function graphqlOptions(request) {
            return {
                schema: _data.executableSchema,
                context: request
            };
        },
        route: {
            cors: true
        }
    }
});
server.register({
    register: _graphqlServerHapi.graphiqlHapi,
    options: {
        path: '/graphiql',
        graphiqlOptions: {
            endpointURL: '/graphql'
        }
    }
});
server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log('Server running at: ' + server.info.uri);
});