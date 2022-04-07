import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      _id
      lastLogin
      username
      email
    }
  }
`;
export const LPN = gql`
  query LPN($lpn: String) {
    LPN(LPN: $lpn) {
      _id
      LPN
      Subcategory
      Price
    }
  }
`;
export const BILL_CODE = gql`
  query BillCode($billCode: String) {
    BillCode(BillCode: $billCode) {
      _id
      AmazonCategory
      BillCode
      FunctionTest
      Cleaning
      Rebox
      Parts
    }
  }
`;

export const SUBMITTED_LPNS = gql`
query SubmittedLPNs {
  submittedLPNs {
    _id
    LPN
    SubmittedDate
    Price
    FunctionTestChecked
    CleaningChecked
    ReboxChecked
    KittingChecked
    PartsChecked
    FunctionTest
    Cleaning
    Rebox
    Parts
    Kitting
    Subcategory
  }
}
`;

export const SUBMITTED_LPN = gql`
  query SubmittedLpn($lpn: String!) {
    submittedLpn(LPN: $lpn) {
      _id
      LPN
      SubmittedDate
      Price
      FunctionTestChecked
      CleaningChecked
      ReboxChecked
      KittingChecked
      PartsChecked
      FunctionTest
      Cleaning
      Rebox
      Parts
      Kitting
    }
  }
`;