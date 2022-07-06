import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

export const downloadLogs: QueryResolvers['downloadLogs'] = (
  args,
  { root, context, info }
) => {
  const userId = context.currentUser.sub
  return db.downloadLog.findMany({
    where: {
      dataset: {
        dataset: {
          steward: {
            some: {
              id: userId,
            },
          },
        },
      },
    },
  })
}

export const userDownloadLogs: QueryResolvers['downloadLogs'] = (
  args,
  { root, context, info }
) => {
  const userId = context.currentUser.sub
  return db.downloadLog.findMany({
    where: { userId },
  })
}

export const downloadLog: QueryResolvers['downloadLog'] = ({ id }) => {
  return db.downloadLog.findUnique({
    where: { id },
  })
}

export const createDownloadLog: MutationResolvers['createDownloadLog'] = ({
  input,
}) => {
  return db.downloadLog.create({
    data: input,
  })
}

export const updateDownloadLog: MutationResolvers['updateDownloadLog'] = ({
  id,
  input,
}) => {
  return db.downloadLog.update({
    data: input,
    where: { id },
  })
}

export const deleteDownloadLog: MutationResolvers['deleteDownloadLog'] = ({
  id,
}) => {
  return db.downloadLog.delete({
    where: { id },
  })
}
