'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolverMap = undefined;

var _loaders = require('./loaders');

var resolverMap = exports.resolverMap = {
    Query: {
        user: function user(root, args, context, info) {
            _loaders.userLoader.clearAll();
            _loaders.hobbyLoader.clearAll();
            console.log('='.repeat(80));
            return _loaders.userLoader.load(args.id);
        }
    },
    User: {
        follow: function follow(user, args, context, info) {
            return user.follow ? _loaders.userLoader.loadMany(user.follow) : null;
        },
        hobby: function hobby(user, args, context, info) {
            return user.hobby ? _loaders.hobbyLoader.loadMany(user.hobby) : null;
        }
    }
};