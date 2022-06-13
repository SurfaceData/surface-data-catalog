import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

export const datasets: QueryResolvers['datasets'] = () => {
  return db.dataset.findMany()
}

export const dataset: QueryResolvers['dataset'] = ({ id }) => {
  return db.dataset.findUnique({
    where: { id },
  })
}

export const createDataset: MutationResolvers['createDataset'] = ({
  input,
}) => {
  return db.dataset.create({
    data: input,
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
