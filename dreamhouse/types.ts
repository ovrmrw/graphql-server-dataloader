import Hapi from 'hapi';

import { Broker, Property } from './schema';


export interface DataLoaderType<T, R> {
  load(key: T): Promise<R[]>;
  loadMany(keys: T[]): Promise<R[]>;
  clear(key: T): void;
  clearAll(): void;
}


export interface Loaders {
  brokerLoader: DataLoaderType<string, Broker>;
  propertyLoader: DataLoaderType<string, Property>;
}


export type Context = Hapi.Request & { loaders: Loaders };
