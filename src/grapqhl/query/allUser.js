import gql from "graphql-tag";
export const allUserQuery = gql`
  query($count: Int!) {
    allUsers(count: $count) {
      id
      firstName
      lastName
      email
      avatar
    }
  }
`;
