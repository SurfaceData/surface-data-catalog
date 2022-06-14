export const schema = gql`
  type DownloadLog {
    id: Int!
    userId: String!
    datasetId: String!
    statusCode: Int!
    createdAt: DateTime!
  }

  type Query {
    downloadLogs: [DownloadLog!]! @requireAuth(roles: ["admin", "steward"])
    userDownloadLogs: [DownloadLog!]! @requireAuth
    downloadLog(id: Int!): DownloadLog @requireAuth
  }

  input CreateDownloadLogInput {
    userId: String!
    datasetId: String!
    statusCode: Int!
  }

  input UpdateDownloadLogInput {
    userId: String
    datasetId: String
    statusCode: Int
  }

  type Mutation {
    createDownloadLog(input: CreateDownloadLogInput!): DownloadLog! @requireAuth
  }
`
