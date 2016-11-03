import firebase from 'firebase';
import path from 'path';


const root = path.resolve();
const secretJsonPath = path.join(root, 'secret.json');
console.log('Secret JSON Path:', secretJsonPath);


firebase.initializeApp({
  serviceAccount: secretJsonPath,
  databaseURL: "https://graphql-e5abf.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: 'restricted-uid'
  }
});
