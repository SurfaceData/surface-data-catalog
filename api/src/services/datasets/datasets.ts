import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

export const allDatasets: QueryResolvers['datasets'] = () => {
  return db.dataset.findMany()
}

export const datasets: QueryResolvers['datasets'] = (
  args,
  { root, context, info }
) => {
  const userId = context.currentUser.sub
  return db.dataset.findMany({
    where: {
      steward: {
        some: {
          id: userId,
        },
      },
    },
  })
}

export const dataset: QueryResolvers['dataset'] = ({ id }) => {
  return db.dataset.findUnique({
    where: { id },
  })
}

export const createDataset: MutationResolvers['createDataset'] = (
  { input },
  { root, context, info }
) => {
  const userId = context.currentUser.sub
  return db.dataset.create({
    data: {
      ...input,
      steward: {
        connect: [{ id: userId }],
      },
    },
  })
}

export const updateDataset: MutationResolvers['updateDataset'] = ({
  id,
  input,
}) => {
  return db.dataset.update({
    data: input,
    where: { id },
  })
}

export const deleteDataset: MutationResolvers['deleteDataset'] = ({ id }) => {
  return db.dataset.delete({
    where: { id },
  })
}
