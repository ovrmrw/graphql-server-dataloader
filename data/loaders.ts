const DataLoader = require('dataloader');

import { User, Hobby } from './schema';
import { getUsersConnector, getHobbiesConnector } from './firebase-connectors';
import { Loaders } from './types';


export function createLoaders(cache: boolean = true, batch: boolean = true): Loaders {
  const options = { cache, batch };
  return {
    userLoader: new DataLoader(userLoaderCallback, options),
    hobbyLoader: new DataLoader(hobbyLoaderCallback, options),
  }
}


function userLoaderCallback(keys: string[]): Promise<User[]> {
  return getUsersConnector(keys);
}


function hobbyLoaderCallback(keys: string[]): Promise<Hobby[]> {
  return getHobbiesConnector(keys);
}
