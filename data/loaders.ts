import firebase from 'firebase';
const DataLoader = require('dataloader');

import { User, Hobby } from './schema';
import { getUser, getHobby } from './firebase-queries';


export const userLoader: DataLoaderType<string, User> = new DataLoader((keys: string[]) => {
  return new Promise<User[]>((resolve, reject) => {
    const promises: Promise<User>[] | never = keys.map(key => {
      return getUser(key);
    });

    Promise.all(promises)
      .then(results => resolve(results))
      .catch(err => reject(err));
  });
});


export const hobbyLoader: DataLoaderType<string, Hobby> = new DataLoader((keys: string[]) => {
  return new Promise<Hobby[]>((resolve, reject) => {
    const promises: Promise<Hobby>[] | never = keys.map(key => {
      return getHobby(key);
    });

    Promise.all(promises)
      .then(results => resolve(results))
      .catch(err => reject(err));
  });
});



interface DataLoaderType<T, R> {
  load(key: T): Promise<R[]>;
  loadMany(keys: T[]): Promise<R[]>;
  clear(key: T): void;
  clearAll(): void;
}
