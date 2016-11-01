'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.executableSchema = undefined;

var _graphqlTools = require('graphql-tools');

var _schema = require('./schema');

var _resolvers = require('./resolvers');

var executableSchema = exports.executableSchema = (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: _schema.schema,
    resolvers: _resolvers.resolverMap
});