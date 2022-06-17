export const schema = gql`
  type DatasetSubset {
    id: String!
    language: String!
    path: String!
    dataset: Dataset!
    datasetId: String!
  }

  type Query {
    datasetSubsets(datasetId: String!): [DatasetSubset!]! @requireAuth
    datasetSubset(id: String!): DatasetSubset @requireAuth
  }

  input CreateDatasetSubsetInput {
    language: String!
    path: String!
    datasetId: String!
  }

  input UpdateDatasetSubsetInput {
    language: String
    path: String
    datasetId: String
  }

  type Mutation {
    createDatasetSubset(input: CreateDatasetSubsetInput!): DatasetSubset!
      @requireAuth
    updateDatasetSubset(
      id: String!
      input: UpdateDatasetSubsetInput!
    ): DatasetSubset! @requireAuth
    deleteDatasetSubset(id: String!): DatasetSubset! @requireAuth
  }
`
