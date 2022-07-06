import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

export const datasetAccesses: QueryResolvers['datasetAccesses'] = (
  args,
  { root, context, info }
) => {
  const userId = context.currentUser.sub
  return db.datasetAccess.findMany({
    where: {
      dataset: {
        steward: {
          some: {
            id: userId,
          },
        },
      },
    },
  })
}

export const datasetAccess: QueryResolvers['datasetAccess'] = ({
  userId,
  datasetId,
}) => {
  return db.datasetAccess.findUnique({
    where: {
      userId_datasetId: {
        userId,
        datasetId,
      },
    },
  })
}

export const requestDatasetAccess: MutationResolvers['requestDatasetAccess'] =
  ({ input }) => {
    return db.datasetAccess.create({
      data: {
        ...input,
        status: 1,
      },
    })
  }

export const createDatasetAccess: MutationResolvers['createDatasetAccess'] = ({
  input,
}) => {
  return db.datasetAccess.create({
    data: input,
  })
}

export const updateDatasetAccess: MutationResolvers['updateDatasetAccess'] = ({
  id,
  input,
}) => {
  return db.datasetAccess.update({
    data: input,
    where: { id },
  })
}

export const deleteDatasetAccess: MutationResolvers['deleteDatasetAccess'] = ({
  id,
}) => {
  return db.datasetAccess.delete({
    where: { id },
  })
}
