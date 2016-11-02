const DataLoader = require('dataloader');

import { User, Hobby } from './schema';
import { getUsersConnector, getHobbiesConnector } from './firebase-connectors';
import { DataLoaderType, Loaders } from './types';


export function createLoaders(cache: boolean = true, batch: boolean = true): Loaders {
  const options = { cache, batch };
  return {
    userLoader: new DataLoader(userLoaderCallback, options) as DataLoaderType<string, User>,
    hobbyLoader: new DataLoader(hobbyLoaderCallback, options) as DataLoaderType<string, Hobby>,
  }
}


function userLoaderCallback(keys: string[]): Promise<User[]> {
  return getUsersConnector(keys);
}


function hobbyLoaderCallback(keys: string[]): Promise<Hobby[]> {
  return getHobbiesConnector(keys);
}
