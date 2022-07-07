import { pathSigner } from 'src/lib/aws'
import { db } from 'src/lib/db'

import type {
  QueryResolvers,
  MutationResolvers,
  DatasetSubsetResolvers,
} from 'types/graphql'

export const datasetSubsets: QueryResolvers['datasetSubsets'] = ({
  datasetId,
}) => {
  return db.datasetSubset.findMany({
    where: { datasetId },
    select: {
      id: true,
      language: true,
      dataset: true,
      datasetId: true,
    },
  })
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

export const uploadDatasetSubset: MutationResolvers['uploadDatasetSubset'] =
  async ({ input }) => {
    const { task } = await db.dataset.findUnique({
      where: { id: input.datasetId },
    })
    const { signedRequest, path } = await pathSigner.getSignedUpload(
      input.datasetId,
      task
    )
    const id = `${input.datasetId}-${input.language}`
    await db.datasetSubset.create({
      data: {
        id,
        path,
        language: input.language,
        datasetId: input.datasetId,
      },
    })
    return {
      signedRequest,
    }
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
