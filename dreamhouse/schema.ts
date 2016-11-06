////////////////////////////// SCHEMA ////////////////////////////// 
export const schema = [`

type Broker {
  id: ID!  
  firstName: String
  lastName: String
  name: String
  title: String
  phone: String
  mobilePhone: String
  email: String
  picture: String
}

type Property {
  id: ID!
  address: String
  city: String
  state: String
  zip: String
  price: String
  title: String
  bedrooms: Int
  bathrooms: Int
  long: Float
  lat: Float
  pic: String
  thumb: String
  tags: String
  description: String
  broker: Broker
}

type RootQuery {
  brokers: [Broker]
  brokerById(id: ID!): Broker
  properties: [Property]
  propertiesByName(searchKey: String!): [Property]
  propertyById(id: ID!): Property
}

schema {
  query: RootQuery
}

`];


////////////////////////////// INTERFACE //////////////////////////////
export interface Broker {
  id: ID;
  firstName: string;
  lastName: string;
  name: string;
  title: string;
  phone: string;
  mobilePhone: string;
  email: string;
  picture: string;
}

export interface Property {
  id: ID;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  long: number;
  lat: number;
  pic: string;
  thumb: string;
  tags: string;
  description: string;
  broker: Broker;
}


type ID = string;
