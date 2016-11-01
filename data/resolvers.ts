import Hapi from 'hapi';
import lodash from 'lodash';
import { GraphQLResolveInfo } from 'graphql';

import { User, Hobby } from './schema';
import { userLoader, hobbyLoader } from './loaders';
import { getUserIds } from './firebase-queries';


export const resolverMap = {

  Query: {
    users(root: any, args: {}, context: Context, info: GraphQLResolveInfo): Promise<User[]> {
      console.log('='.repeat(80));
      userLoader.clearAll();
      hobbyLoader.clearAll();
      return getUserIds().then(ids => userLoader.loadMany(ids));
    },

    user(root: any, args: { id: string }, context: Context, info: GraphQLResolveInfo): Promise<User[]> {
      console.log('='.repeat(80));
      userLoader.clearAll();
      hobbyLoader.clearAll();
      return userLoader.load(args.id);
    },
  },


  User: {
    follow(user: User, args: {}, context: Context, info: GraphQLResolveInfo): Promise<User[]> | null {
      // userLoader.clearAll();
      return user.follow ? userLoader.loadMany(user.follow) : null;
    },

    hobby(user: User, args: {}, context: Context, info: GraphQLResolveInfo): Promise<Hobby[]> | null {
      // hobbyLoader.clearAll();
      return user.hobby ? hobbyLoader.loadMany(user.hobby) : null;
    }
  }

};



type Context = Hapi.Request; 
