'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolverMap = undefined;

var _loaders = require('./loaders');

var _firebaseQueries = require('./firebase-queries');

var resolverMap = exports.resolverMap = {
    Query: {
        users: function users(root, args, context, info) {
            console.log('='.repeat(80));
            _loaders.userLoader.clearAll();
            _loaders.hobbyLoader.clearAll();
            return (0, _firebaseQueries.getUserIds)().then(function (ids) {
                return _loaders.userLoader.loadMany(ids);
            });
        },
        user: function user(root, args, context, info) {
            console.log('='.repeat(80));
            _loaders.userLoader.clearAll();
            _loaders.hobbyLoader.clearAll();
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