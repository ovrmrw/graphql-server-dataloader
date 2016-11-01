////////////////////////////// SCHEMA ////////////////////////////// 
export const schema = `

type User {
  id: ID!
  name: String!
  age: Int
  address: Address
  follow: [User]
  hobby: [Hobby]
}

type Address {
  zip: String
  street: String
}

type Hobby {
  id: ID!
  name: String!
}

type Query {
  user(id: ID!): User
}

schema {
  query: Query
}

`;


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
