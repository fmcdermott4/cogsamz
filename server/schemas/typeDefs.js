const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    "Find all AMM2 available"
    AMM2: [AMM2]
    "Find single LPN"
    LPN(LPN:String):AMM2
    "Find all bill code"
    BillCodes: [COGS]
    "Find single bill code"
    BillCode(BillCode:String): COGS
    "Find the logged in user."
    me: User
  }

  type Mutation {
    createUser(email: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth
  }

  type Auth {
    token: String!
    user: User!
  }
  type AMM2 {
    _id: ID
    LPN: String
    Subcategory: String
    Price: String
  }
  type COGS {
    _id: ID
    AmazonCategory: String
    BillCode: String
    FunctionTest: String
    Cleaning: String
    Rebox: String
    Parts: String
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    lastLogin: Date!
  }
`;

module.exports = typeDefs;
