import Hapi from 'hapi';
import { GraphQLResolveInfo } from 'graphql';

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
    follow(user: User, args: {}, context: Context, info: GraphQLResolveInfo): Promise<User[]> | null {
      return user.follow ? context.loaders.userLoader.loadMany(user.follow) : null;
    },

    hobby(user: User, args: {}, context: Context, info: GraphQLResolveInfo): Promise<Hobby[]> | null {
      return user.hobby ? context.loaders.hobbyLoader.loadMany(user.hobby) : null;
    }
  }

};
