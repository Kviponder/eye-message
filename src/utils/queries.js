const { gql } = require("@apollo/client");

export const QUERY_USERNAME = gql`
  query UserByName($username: String!) {
    userByName(username: $username) {
      username
      _id
    }
  }
`;
export const QUERY_FRIENDS = gql`
  query Friends {
    friends {
      username
      _id
    }
  }
`;