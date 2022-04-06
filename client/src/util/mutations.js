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

export const UPSERT_SUBMITTED_LPN = gql`
  mutation upsertSubmittedLpn($LPN: String!, $price: String!, $functionTest: String!, $cleaning: String!, $rebox: String!, $parts: String!, $functionTestChecked: Boolean, $cleaningChecked: Boolean, $reboxChecked: Boolean, $kittingChecked: Boolean, $partsChecked: Boolean, $kitting: String) {
    upsertSubmittedLpn(LPN: $LPN, Price: $price, FunctionTest: $functionTest, Cleaning: $cleaning, Rebox: $rebox, Parts: $parts, FunctionTestChecked: $functionTestChecked, CleaningChecked: $cleaningChecked, ReboxChecked: $reboxChecked, KittingChecked: $kittingChecked, PartsChecked: $partsChecked, Kitting: $kitting) {
      _id
      LPN
    }
  }
`;
