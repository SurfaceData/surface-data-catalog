import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  DatasetSubsetResolvers,
} from 'types/graphql'

export const datasetSubsets: QueryResolvers['datasetSubsets'] = () => {
  return db.datasetSubset.findMany()
}

export const datasetSubset: QueryResolvers['datasetSubset'] = ({ id }) => {
  return db.datasetSubset.findUnique({
    where: { id },
  })
}

export const createDatasetSubset: MutationResolvers['createDatasetSubset'] = ({
  input,
}) => {
  const id = `${input.datasetId}-${input.language}`
  return db.datasetSubset.create({
    data: {
      ...input,
      id,
    },
  })
}

export const updateDatasetSubset: MutationResolvers['updateDatasetSubset'] = ({
  id,
  input,
}) => {
  return db.datasetSubset.update({
    data: input,
    where: { id },
  })
}

export const deleteDatasetSubset: MutationResolvers['deleteDatasetSubset'] = ({
  id,
}) => {
  return db.datasetSubset.delete({
    where: { id },
  })
}

export const DatasetSubset: DatasetSubsetResolvers = {
  dataset: (_obj, { root }) =>
    db.datasetSubset.findUnique({ where: { id: root.id } }).dataset(),
}
