export const schema = gql`
  type DatasetAccess {
    id: Int!
    userId: String!
    datasetId: String!
    status: Int!
  }

  type Query {
    datasetAccesses: [DatasetAccess!]! @requireAuth
    datasetAccess(userId: String!, datasetId: String!): DatasetAccess
      @requireAuth
  }

  input RequestDatasetAccessInput {
    userId: String!
    datasetId: String!
  }

  input CreateDatasetAccessInput {
    userId: String!
    datasetId: String!
    status: Int!
  }

  input UpdateDatasetAccessInput {
    userId: String
    datasetId: String
    status: Int
  }

  type Mutation {
    requestDatasetAccess(input: RequestDatasetAccessInput!): DatasetAccess!
      @requireAuth
    createDatasetAccess(input: CreateDatasetAccessInput!): DatasetAccess!
      @requireAuth
    updateDatasetAccess(
      id: Int!
      input: UpdateDatasetAccessInput!
    ): DatasetAccess! @requireAuth
    deleteDatasetAccess(id: Int!): DatasetAccess! @requireAuth
  }
`
