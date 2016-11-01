'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserIds = getUserIds;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserIds() {
    return new Promise(function (resolve) {
        _firebase2.default.database().ref('users').once('value', function (snapshot) {
            var users = _lodash2.default.toArray(snapshot.val()).filter(function (obj) {
                return !!obj;
            });
            var ids = users.map(function (user) {
                return user.id ? user.id : '';
            }).filter(function (id) {
                return !!id;
            });
            resolve(ids);
        });
    });
}