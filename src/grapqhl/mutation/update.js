import gql from "graphql-tag";
export const updateMutate = gql`
  mutation updateMutation($id: ID!, $firstName: String, $lastName: String, $email: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;
