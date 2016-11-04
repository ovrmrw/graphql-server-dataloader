import firebase from 'firebase';
import lodash from 'lodash';
const assert = require('power-assert');

import { User, Hobby } from './schema';


export async function getUserIdsConnector(): Promise<string[]> {
  const snapshot = await firebase.database().ref('users').once('value') as Snapshot;
  const users: User[] = lodash.toArray<User>(snapshot.val()).filter(obj => !!obj);
  users.forEach(user => assert(lodash.isObject(user) && 'id' in user));
  const ids: string[] = users.map(user => user.id);
  return ids;
}


export async function getUsersConnector(keys: string[]): Promise<User[]> {
  const snapshotPromises = keys.map(key => firebase.database().ref('users/' + key).once('value') as Promise<Snapshot>);
  const snapshots = await Promise.all(snapshotPromises);
  const users: User[] = snapshots.map(snapshot => snapshot.val());
  users.forEach(user => assert(lodash.isObject(user) && 'id' in user));
  console.log('userLoader fetch:', ...users.map(user => ({ id: user.id, name: user.name })));
  return users;
}


export async function getHobbiesConnector(keys: string[]): Promise<Hobby[]> {
  const snapshotPromises = keys.map(key => firebase.database().ref('hobby/' + key).once('value') as Promise<Snapshot>);
  const snapshots = await Promise.all(snapshotPromises);
  const hobbies: Hobby[] = snapshots.map(snapshot => snapshot.val());
  hobbies.forEach(hobby => assert(lodash.isObject(hobby) && 'id' in hobby));
  console.log('hobbyLoader fetch:', ...hobbies.map(hobby => ({ id: hobby.id, name: hobby.name })));
  return hobbies;
}



type Snapshot = firebase.database.DataSnapshot;
