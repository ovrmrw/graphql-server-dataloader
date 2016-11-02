import firebase from 'firebase';
import lodash from 'lodash';

import { User, Hobby } from './schema';


export function getUserIdsConnector(): Promise<string[]> {
  return new Promise<string[]>(resolve => {
    firebase.database().ref('users').once('value', snapshot => {
      const users: User[] = lodash.toArray<User>(snapshot.val()).filter(obj => !!obj);
      const ids: string[] = users.map(user => user.id ? user.id : '').filter(id => !!id);
      resolve(ids);
    });
  });
}


export function getUsersConnector(keys: string[]): Promise<User[]> {
  return new Promise<User[]>(async (resolve) => {
    const promises = keys.map(key => new Promise<User>(resolve => {
      firebase.database().ref('users/' + key).once('value', snapshot => {
        const user: User = snapshot.val();
        console.log('userLoader fetch:', { id: user.id, name: user.name });
        resolve(user);
      });
    }));
    resolve(await Promise.all(promises));
  });
}


export function getHobbiesConnector(keys: string[]): Promise<Hobby[]> {
  return new Promise<Hobby[]>(async (resolve) => {
    const promises = keys.map(key => new Promise<Hobby>(resolve => {
      firebase.database().ref('hobby/' + key).once('value', snapshot => {
        const hobby: Hobby = snapshot.val();
        console.log('hobbyLoader fetch:', { id: hobby.id, name: hobby.name });
        resolve(hobby);
      });
    }));
    resolve(await Promise.all(promises));
  });
}
