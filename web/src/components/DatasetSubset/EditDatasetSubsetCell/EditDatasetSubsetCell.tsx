import type { EditDatasetSubsetById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import DatasetSubsetForm from 'src/components/DatasetSubset/DatasetSubsetForm'

export const QUERY = gql`
  query EditDatasetSubsetById($subsetId: String!) {
    datasetSubset: datasetSubset(id: $subsetId) {
      id
      language
      path
      datasetId
    }
  }
`
const UPDATE_DATASET_SUBSET_MUTATION = gql`
  mutation UpdateDatasetSubsetMutation($id: String!, $input: UpdateDatasetSubsetInput!) {
    updateDatasetSubset(id: $id, input: $input) {
      id
      language
      path
      datasetId
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error.message}</div>
  )

export const Success = ({ datasetSubset }: CellSuccessProps<EditDatasetSubsetById>) => {
  const [updateDatasetSubset, { loading, error }] = useMutation(UPDATE_DATASET_SUBSET_MUTATION, {
    onCompleted: () => {
      toast.success('DatasetSubset updated')
      navigate(routes.datasetSubsets())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateDatasetSubset({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit {datasetSubset.id}</h2>
      </header>
      <div className="rw-segment-main">
        <DatasetSubsetForm datasetSubset={datasetSubset} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
