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

export const UPSERT_CLEANING = gql`
  mutation UpsertCleaning($lpn: String!, $pass: Boolean, $cleaning: CycleInput) {
    upsertCleaning(LPN: $lpn, Pass: $pass, Cleaning: $cleaning) {
      _id
      LPN
    }
  }
`;

export const UPSERT_FUNCTION_TEST = gql`
  mutation UpsertFunctionTest($lpn: String!, $pass: Boolean, $test: CycleInput) {
    upsertFunctionTest(LPN: $lpn, Pass: $pass, Test: $test) {
      _id
      LPN
    }
  }
`;

export const UPSERT_SUBMITTED_LPN = gql`
  mutation upsertSubmittedLpn($lpn: ID!, $user:ID, $functionTest: String!, $cleaning: String!, $rebox: String!, $parts: String!, $functionTestChecked: Boolean, $cleaningChecked: Boolean, $reboxChecked: Boolean, $kittingChecked: Boolean, $partsChecked: Boolean, $kitting: String) {
    upsertSubmittedLpn(LPN: $lpn, User:$user, FunctionTest: $functionTest, Cleaning: $cleaning, Rebox: $rebox, Parts: $parts, FunctionTestChecked: $functionTestChecked, CleaningChecked: $cleaningChecked, ReboxChecked: $reboxChecked, KittingChecked: $kittingChecked, PartsChecked: $partsChecked, Kitting: $kitting) {
      _id
    }
  }
`;
