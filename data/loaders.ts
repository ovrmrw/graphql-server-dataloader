import firebase from 'firebase';
const DataLoader = require('dataloader');

import { User, Hobby } from './schema';
import { getUser, getHobby } from './firebase-connectors';
import { DataLoaderType, Loaders } from './types';


export function createLoaders(cache: boolean = true, batch: boolean = true): Loaders {
  const options = { cache, batch };
  return {
    userLoader: new DataLoader(userLoaderCallback(), options) as DataLoaderType<string, User>,
    hobbyLoader: new DataLoader(hobbyLoaderCallback(), options) as DataLoaderType<string, Hobby>,
  }
}


function userLoaderCallback(): (keys: string[]) => Promise<User[]> {
  return async (keys: string[]) => {
    const promises: Promise<User>[] = keys.map(key => {
      return getUser(key);
    });

    try {
      return await Promise.all(promises);
    } catch (err) {
      throw err;
    }
  }
}


function hobbyLoaderCallback(): (keys: string[]) => Promise<Hobby[]> {
  return async (keys: string[]) => {
    const promises: Promise<Hobby>[] = keys.map(key => {
      return getHobby(key);
    });

    try {
      return await Promise.all(promises);
    } catch (err) {
      throw err;
    }
  }
}


// export const hobbyLoader: DataLoaderType<string, Hobby> = new DataLoader((keys: string[]) => {
//   return new Promise<Hobby[]>((resolve, reject) => {
//     const promises: Promise<Hobby>[] | never = keys.map(key => {
//       return getHobby(key);
//     });

//     Promise.all(promises)
//       .then(results => resolve(results))
//       .catch(err => reject(err));
//   });
// });



