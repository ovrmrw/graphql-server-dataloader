import firebase from 'firebase';
import path from 'path';


const root = path.resolve();
const jsonPath = path.join(root, 'secret.json');
console.log('jsonPath:', jsonPath);

firebase.initializeApp({
  serviceAccount: jsonPath,
  databaseURL: "https://graphql-e5abf.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: 'restricted-uid'
  }
});
