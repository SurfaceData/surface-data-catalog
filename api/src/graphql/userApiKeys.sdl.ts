export const schema = gql`
  type UserApiKey {
    id: String!
    key: String!
  }

  type Query {
    userApiKey: UserApiKey @requireAuth
  }

  input CreateUserApiKeyInput {
    id: String!
  }

  type Mutation {
    createUserApiKey: UserApiKey! @requireAuth
    deleteUserApiKey: UserApiKey! @requireAuth
  }
`
