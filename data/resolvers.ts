import Hapi from 'hapi';
import { GraphQLResolveInfo } from 'graphql';

import { User, Hobby } from './schema';
import { userLoader, hobbyLoader } from './loaders';


export const resolverMap = {

  Query: {
    user(root: any, args: { id: string }, context: Context, info: GraphQLResolveInfo): Promise<User[]> {
      userLoader.clearAll();
      hobbyLoader.clearAll();
      console.log('='.repeat(80));
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
