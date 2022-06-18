export const schema = gql`
  type Dataset {
    id: String!
    name: String!
    task: String!
    license: String!
  }

  type Query {
    datasets: [Dataset!]!
    dataset(id: String!): Dataset @requireAuth
  }

  input CreateDatasetInput {
    id: String!
    name: String!
    task: String!
    license: String!
  }

  input UpdateDatasetInput {
    name: String
    task: String
    license: String
  }

  type Mutation {
    createDataset(input: CreateDatasetInput!): Dataset!
      @requireAuth(roles: ["admin", "steward"])
    updateDataset(id: String!, input: UpdateDatasetInput!): Dataset!
      @requireAuth(roles: ["admin", "steward"])
    deleteDataset(id: String!): Dataset!
      @requireAuth(roles: ["admin", "steward"])
  }
`
