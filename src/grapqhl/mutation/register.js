import gql from "graphql-tag";
export const registerMutate = gql`
  mutation registerMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
    }
  }
`;
