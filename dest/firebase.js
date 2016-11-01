'use strict';

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = _path2.default.resolve();
var jsonPath = _path2.default.join(root, 'secret.json');
console.log('Secret JSON Path:', jsonPath);
_firebase2.default.initializeApp({
    serviceAccount: jsonPath,
    databaseURL: "https://graphql-e5abf.firebaseio.com",
    databaseAuthVariableOverride: {
        uid: 'restricted-uid'
    }
});