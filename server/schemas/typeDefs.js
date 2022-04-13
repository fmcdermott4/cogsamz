const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    AMM2: [AMM2]  
    LPN(LPN:String):AMM2  
    BillCodes: [COGS]  
    BillCode(BillCode:String): COGS
    FunctionTests(subcategory:String, Pass:Boolean, minDate:Date, maxDate:Date, user:ID):[FunctionTest]
    me: User
    submittedLpn(LPN:String!):SubmittedLpn
    submittedLPNs(minDate:Date, maxDate:Date, subcategory:String): [SubmittedLpn]
  }

  type Mutation {
    upsertCleaning(LPN:String!, Pass:Boolean, Cleaning:CycleInput):AMM2
    upsertFunctionTest(LPN:String!, Pass:Boolean, Test:CycleInput):AMM2
    upsertSubmittedLpn(LPN:ID!, User:ID, FunctionTestChecked:Boolean, CleaningChecked:Boolean, ReboxChecked: Boolean, KittingChecked: Boolean, PartsChecked: Boolean, FunctionTest: String!, Cleaning: String!, Rebox: String!, Parts: String!, Kitting: String): SubmittedLpn
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
    DateCreated: Date
    Active: Boolean
  }

  type Cleaning {
    _id: ID
    LPN: AMM2
    Pass: Boolean
    Cleaning: [Cycle]
  }

  input CycleInput{
    _id:ID
    User:ID!
    StartTime:Date
    EndTime:Date
  }

  type Cycle{
    _id:ID!
    User:User!
    StartTime:Date!
    EndTime:Date!
  }

  type FunctionTest {
    _id: ID
    LPN: AMM2
    Pass: Boolean
    Test: [Cycle]
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

  type SubmittedLpn {
    _id: ID
    LPN: AMM2!
    User: User
    SubmittedDate: Date!
    FunctionTestChecked: Boolean
    CleaningChecked: Boolean
    ReboxChecked: Boolean
    KittingChecked: Boolean
    PartsChecked: Boolean
    FunctionTest: String!
    Cleaning: String!
    Rebox: String!
    Parts: String!
    Kitting: String!
  }
  

  type User {
    _id: ID!
    username: String!
    email: String!
    lastLogin: Date!
    access:String
  }
`;

module.exports = typeDefs;
