import Hapi from 'hapi';
import { GraphQLResolveInfo } from 'graphql';
import lodash from 'lodash';

import { Broker, Property } from './schema';
// import { getUserIdsConnector } from './firebase-connectors';
import { Context } from './types';


export const resolverMap = {

  RootQuery: {
    brokers(root: any, args: {}, context: Context, info: GraphQLResolveInfo): Promise<Broker[]> {
      // return  getUserIdsConnector().then(ids => context.loaders.userLoader.loadMany(ids));
      return context.loaders.brokerLoader.load();
    },

    brokerById(root: any, args: { id: string }, context: Context, info: GraphQLResolveInfo): Promise<Broker[]> {
      return context.loaders.brokerLoader.load(args.id);
    },
  },


  User: {
    follow(user: User, args: { first?: number }, context: Context, info: GraphQLResolveInfo): Promise<User[]> | null {
      const limit: number = args.first || 100;
      const followIds: string[] | null = user.follow ? user.follow.slice(0, limit) : null;
      return followIds ? context.loaders.userLoader.loadMany(followIds) : null;
    },

    hobby(user: User, args: { first?: number }, context: Context, info: GraphQLResolveInfo): Promise<Hobby[]> | null {
      const limit: number = args.first || 100;
      const hobbyIds: string[] | null = user.hobby ? user.hobby.slice(0, limit) : null;
      return hobbyIds ? context.loaders.hobbyLoader.loadMany(hobbyIds) : null;
    }
  }

};
