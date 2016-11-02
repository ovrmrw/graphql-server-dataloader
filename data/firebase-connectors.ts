import firebase from 'firebase';
import lodash from 'lodash';

import { User, Hobby } from './schema';


export function getUserIds(): Promise<string[]> | never {
  return new Promise<string[]>(resolve => {
    firebase.database().ref('users').once('value', snapshot => {
      const users: User[] = lodash.toArray<User>(snapshot.val()).filter(obj => !!obj);
      const ids: string[] = users.map(user => user.id ? user.id : '').filter(id => !!id);
      resolve(ids);
    });
  });
}


export function getUser(key: string): Promise<User> {
  return new Promise<User>(resolve => {
    firebase.database().ref('users/' + key).once('value', snapshot => {
      const user: User = snapshot.val();
      console.log('userLoader fetch:', { id: user.id, name: user.name });
      resolve(user);
    });
  });
}


export function getHobby(key: string): Promise<Hobby> {
  return new Promise<Hobby>(resolve => {
    firebase.database().ref('hobby/' + key).once('value', snapshot => {
      const hobby: Hobby = snapshot.val();
      console.log('hobbyLoader fetch:', { id: hobby.id, name: hobby.name });
      resolve(hobby);
    });
  });
}
