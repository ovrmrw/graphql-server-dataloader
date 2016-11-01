'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hobbyLoader = exports.userLoader = undefined;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataLoader = require('dataloader');
var userLoader = exports.userLoader = new DataLoader(function (keys) {
    return new Promise(function (resolve, reject) {
        var promises = keys.map(function (key) {
            return new Promise(function (resolve) {
                _firebase2.default.database().ref('users/' + key).once('value', function (snapshot) {
                    var user = snapshot.val();
                    console.log('userLoader fetch:', { id: user.id, name: user.name });
                    resolve(user);
                });
            });
        });
        Promise.all(promises).then(function (results) {
            return resolve(results);
        }).catch(function (err) {
            return reject(err);
        });
    });
});
var hobbyLoader = exports.hobbyLoader = new DataLoader(function (keys) {
    return new Promise(function (resolve, reject) {
        var promises = keys.map(function (key) {
            return new Promise(function (resolve) {
                _firebase2.default.database().ref('hobby/' + key).once('value', function (snapshot) {
                    var hobby = snapshot.val();
                    console.log('hobbyLoader fetch:', { id: hobby.id, name: hobby.name });
                    resolve(hobby);
                });
            });
        });
        Promise.all(promises).then(function (results) {
            return resolve(results);
        }).catch(function (err) {
            return reject(err);
        });
    });
});