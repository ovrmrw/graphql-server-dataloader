import firebase from 'firebase';
import lodash from 'lodash';

import { User } from './schema';


export function getUserIds(): Promise<string[]> | never {
  return new Promise<string[]>(resolve => {
    firebase.database().ref('users').once('value', snapshot => {
      const users: User[] = lodash.toArray<User>(snapshot.val()).filter(obj => !!obj);
      const ids: string[] = users.map(user => user.id ? user.id : '').filter(id => !!id);
      resolve(ids);
    });
  });
}
