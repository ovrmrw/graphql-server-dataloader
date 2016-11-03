import firebase from 'firebase';
import lodash from 'lodash';

import { User, Hobby } from './schema';


export async function getUserIdsConnector(): Promise<string[]> {
  const snapshot = await firebase.database().ref('users').once('value') as Snapshot;
  const users: User[] = lodash.toArray<User>(snapshot.val()).filter(obj => !!obj);
  const ids: string[] = users.map(user => user.id ? user.id : '').filter(id => !!id);
  return ids;
}


export async function getUsersConnector(keys: string[]): Promise<User[]> {
  const snapshotPromises = keys.map(key => firebase.database().ref('users/' + key).once('value') as Promise<Snapshot>);
  const users: User[] = await Promise.all(snapshotPromises).then(snapshots => snapshots.map(s => s.val()));
  users.forEach(user => console.log('userLoader fetch:', { id: user.id, name: user.name }));
  return users;
}


export async function getHobbiesConnector(keys: string[]): Promise<Hobby[]> {
  const snapshotPromises = keys.map(key => firebase.database().ref('hobby/' + key).once('value') as Promise<Snapshot>);
  const hobbies: Hobby[] = await Promise.all(snapshotPromises).then(snapshots => snapshots.map(s => s.val()));
  hobbies.forEach(hobby => console.log('hobbyLoader fetch:', { id: hobby.id, name: hobby.name }));
  return hobbies;
}



type Snapshot = firebase.database.DataSnapshot;
