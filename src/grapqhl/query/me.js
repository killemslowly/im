import gql from "graphql-tag";
export const meQuery = gql`
  query {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;
