import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import DatasetForm from 'src/components/Dataset/DatasetForm'

const CREATE_DATASET_MUTATION = gql`
  mutation CreateDatasetMutation($input: CreateDatasetInput!) {
    createDataset(input: $input) {
      id
    }
  }
`

const NewDataset = () => {
  const [createDataset, { loading, error }] = useMutation(CREATE_DATASET_MUTATION, {
    onCompleted: () => {
      toast.success('Dataset created')
      navigate(routes.datasets())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createDataset({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Dataset</h2>
      </header>
      <div className="rw-segment-main">
        <DatasetForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDataset
