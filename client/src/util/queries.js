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
