import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import DatasetSubsetForm from 'src/components/DatasetSubset/DatasetSubsetForm'

const CREATE_DATASET_SUBSET_MUTATION = gql`
  mutation CreateDatasetSubsetMutation($input: CreateDatasetSubsetInput!) {
    createDatasetSubset(input: $input) {
      id
    }
  }
`

const NewDatasetSubset = () => {
  const [createDatasetSubset, { loading, error }] = useMutation(CREATE_DATASET_SUBSET_MUTATION, {
    onCompleted: () => {
      toast.success('DatasetSubset created')
      navigate(routes.datasetSubsets())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createDatasetSubset({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New DatasetSubset</h2>
      </header>
      <div className="rw-segment-main">
        <DatasetSubsetForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDatasetSubset
