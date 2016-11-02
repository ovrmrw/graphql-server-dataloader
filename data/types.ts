import Hapi from 'hapi';

import { User, Hobby } from './schema';


export interface DataLoaderType<T, R> {
  load(key: T): Promise<R[]>;
  loadMany(keys: T[]): Promise<R[]>;
  clear(key: T): void;
  clearAll(): void;
}


export interface Loaders {
  userLoader: DataLoaderType<string, User>;
  hobbyLoader: DataLoaderType<string, Hobby>;
}


export type Context = Hapi.Request & { loaders: Loaders };
