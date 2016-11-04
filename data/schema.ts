////////////////////////////// SCHEMA ////////////////////////////// 
export const schema = [`

  # type definition of User 
type User {
  id: ID!
  name: String!
  age: Int
  address: Address
    # other users who current user follows.
  follow(first: Int): [User]
    # current user's hobbies.
  hobby(first: Int): [Hobby]
}

type Address {
  zip: String
  street: String
}

type Hobby {
  id: ID!
  name: String!
}

type RootQuery {
  users: [User]
  user(id: ID!): User
}

schema {
  query: RootQuery
}

`];


////////////////////////////// INTERFACE //////////////////////////////
export interface User {
  id: ID;
  name: string;
  age?: number;
  address?: Address;
  follow?: ID[];
  hobby?: ID[];
}

export interface Address {
  zip?: string;
  street?: string;
}

export interface Hobby {
  id: ID;
  name: string;
}


type ID = string;
