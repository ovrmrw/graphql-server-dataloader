import Hapi from 'hapi';
import { GraphQLResolveInfo } from 'graphql';
import lodash from 'lodash';

import { User, Hobby } from './schema';
import { getUserIdsConnector } from './firebase-connectors';
import { Context } from './types';


export const resolverMap = {

  RootQuery: {
    users(root: any, args: {}, context: Context, info: GraphQLResolveInfo): Promise<User[]> {
      return getUserIdsConnector().then(ids => context.loaders.userLoader.loadMany(ids));
    },

    user(root: any, args: { id: string }, context: Context, info: GraphQLResolveInfo): Promise<User[]> {
      return context.loaders.userLoader.load(args.id);
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
