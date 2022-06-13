import type { EditDatasetById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import DatasetForm from 'src/components/Dataset/DatasetForm'

export const QUERY = gql`
  query EditDatasetById($id: String!) {
    dataset: dataset(id: $id) {
      id
      name
      language
      task
      path
      license
    }
  }
`
const UPDATE_DATASET_MUTATION = gql`
  mutation UpdateDatasetMutation($id: String!, $input: UpdateDatasetInput!) {
    updateDataset(id: $id, input: $input) {
      id
      name
      language
      task
      path
      license
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ dataset }: CellSuccessProps<EditDatasetById>) => {
  const [updateDataset, { loading, error }] = useMutation(UPDATE_DATASET_MUTATION, {
    onCompleted: () => {
      toast.success('Dataset updated')
      navigate(routes.datasets())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateDataset({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Dataset {dataset.id}</h2>
      </header>
      <div className="rw-segment-main">
        <DatasetForm dataset={dataset} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
