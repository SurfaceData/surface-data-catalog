export const schema = gql`
  type Dataset {
    id: String!
    name: String!
    task: String!
    license: String!
    readme: String
  }

  type Query {
    allDatasets: [Dataset!]! @skipAuth
    datasets: [Dataset!]! @requireAuth
    dataset(id: String!): Dataset @skipAuth
  }

  input CreateDatasetInput {
    id: String!
    name: String!
    task: String!
    license: String!
    readme: String!
  }

  input UpdateDatasetInput {
    name: String
    task: String
    license: String
    readme: String
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
