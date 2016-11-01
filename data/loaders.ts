import firebase from 'firebase';
const DataLoader = require('dataloader');

import { User, Hobby } from './schema';


export const userLoader: DataLoaderType<string, User>
  = new DataLoader((keys: string[]) => new Promise<User[]>((resolve, reject) => {
    const promises: Promise<User>[] | never = keys.map(key => {
      return new Promise<User>(resolve => {
        firebase.database().ref('users/' + key).once('value', snapshot => {
          const user: User = snapshot.val();
          console.log('userLoader fetch:', { id: user.id, name: user.name });
          resolve(user);
        });
      });
    });

    Promise.all(promises)
      .then(results => resolve(results))
      .catch(err => reject(err));
  }));


export const hobbyLoader: DataLoaderType<string, Hobby>
  = new DataLoader((keys: string[]) => new Promise<Hobby[]>((resolve, reject) => {
    const promises: Promise<Hobby>[] | never = keys.map(key => {
      return new Promise<Hobby>(resolve => {
        firebase.database().ref('hobby/' + key).once('value', snapshot => {
          const hobby: Hobby = snapshot.val();
          console.log('hobbyLoader fetch:', { id: hobby.id, name: hobby.name });
          resolve(hobby);
        });
      });
    });

    Promise.all(promises)
      .then(results => resolve(results))
      .catch(err => reject(err));
  }));



interface DataLoaderType<T, R> {
  load(key: T): Promise<R[]>;
  loadMany(keys: T[]): Promise<R[]>;
  clear(key: T): void;
  clearAll(): void;
}
