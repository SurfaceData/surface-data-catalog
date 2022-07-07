import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

const updateIfExpired = (access) => {
  if (access.status != 3 || !access.expiration) {
    return access
  }
  const expiration = new Date(access.expiration)
  if (Date.now() < expiration) {
    return access
  }
  return {
    ...access,
    status: 4,
  }
}

export const datasetAccesses: QueryResolvers['datasetAccesses'] = async (
  args,
  { root, context, info }
) => {
  const userId = context.currentUser.sub
  const results = await db.datasetAccess.findMany({
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
  return results.map(updateIfExpired)
}

export const datasetAccess: QueryResolvers['datasetAccess'] = async ({
  userId,
  datasetId,
}) => {
  const access = await db.datasetAccess.findUnique({
    where: {
      userId_datasetId: {
        userId,
        datasetId,
      },
    },
  })
  return updateIfExpired(access)
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

export const updateDatasetAccess: MutationResolvers['updateDatasetAccess'] =
  async ({ id, input }) => {
    if (input.status != 3) {
      return db.datasetAccess.update({
        data: input,
        where: { id },
      })
    }
    // Figure out what the new expiration time is based on the settings
    // in the underlying dataset.
    const result = await db.datasetAccess.findUnique({
      where: { id },
      select: {
        dataset: {
          select: {
            expirationInDays: true,
          },
        },
      },
    })
    if (!result || result.dataset.expirationInDays == 0) {
      return db.datasetAccess.update({
        data: {
          ...input,
          expiration: null,
        },
        where: { id },
      })
    }
    let expiration = new Date(Date.now())
    expiration.setDate(expiration.getDate() + result.dataset.expirationInDays)
    return db.datasetAccess.update({
      data: {
        ...input,
        expiration: expiration,
      },
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
