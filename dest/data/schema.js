"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = exports.schema = "\n\ntype User {\n  id: ID!\n  name: String!\n  age: Int\n  address: Address\n  follow: [User]\n  hobby: [Hobby]\n}\n\ntype Address {\n  zip: String\n  street: String\n}\n\ntype Hobby {\n  id: ID!\n  name: String!\n}\n\ntype Query {\n  user(id: ID!): User\n}\n\nschema {\n  query: Query\n}\n\n";