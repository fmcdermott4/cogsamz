import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $username: String!) {
    createUser(email: $email, password: $password, username: $username) {
      token
      user {
        _id
        username
        email
        lastLogin
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        lastLogin
      }
    }
  }
`;

export const UPSERT_FUNCTION_TEST = gql`
mutation upsertFunctionTest($lpn: ID, $pass: Boolean, $test: [CycleInput]) {
  upsertFunctionTest(LPN: $lpn, Pass: $pass, Test: $test) {
    _id
  }
}
`;

export const UPSERT_SUBMITTED_LPN = gql`
  mutation upsertSubmittedLpn($lpn: String!, $subcategory:String!, $price: String!, $functionTestChecked: Boolean, $cleaningChecked: Boolean, $reboxChecked: Boolean, $kittingChecked: Boolean, $partsChecked: Boolean, $functionTest: String!, $rebox: String!, $cleaning: String!, $parts: String!, $kitting: String) {
    upsertSubmittedLpn(LPN: $lpn, Subcategory:$subcategory, Price: $price, FunctionTestChecked: $functionTestChecked, CleaningChecked: $cleaningChecked, ReboxChecked: $reboxChecked, KittingChecked: $kittingChecked, PartsChecked: $partsChecked, FunctionTest: $functionTest, Rebox: $rebox, Cleaning: $cleaning, Parts: $parts, Kitting: $kitting) {
      _id
      LPN
    }
  }
`;
