import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { useState } from 'react'
import DatasetSubsetForm from 'src/components/DatasetSubset/DatasetSubsetForm'

const CREATE_DATASET_SUBSET_MUTATION = gql`
  mutation CreateDatasetSubsetMutation($input: CreateDatasetSubsetInput!) {
    createDatasetSubset(input: $input) {
      id
    }
  }
`
const UPLOAD_DATASET_SUBSET_MUTATION = gql`
  mutation UploadDatasetSubsetMutation($input: UploadDatasetSubsetInput!) {
    uploadDatasetSubset(input: $input) {
      signedRequest
    }
  }
`
const NewDatasetSubset = ({ datasetId }) => {
  const [ uploadFile, setUploadFile ] = useState(null)
  const [createDatasetSubset, { loading, error }] = useMutation(
    CREATE_DATASET_SUBSET_MUTATION,
    {
      onCompleted: () => {
        toast.success('DatasetSubset created')
        navigate(routes.stewardDataset({id: datasetId }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const [uploadDatasetSubset] = useMutation(
    UPLOAD_DATASET_SUBSET_MUTATION,
    {
      onCompleted: ({ uploadDatasetSubset }) => {
        fetch(uploadDatasetSubset.signedRequest, {
          method: 'PUT',
          body: uploadFile
        }).then(response  => {
          toast.success('DatasetSubset created')
          navigate(routes.stewardDataset({id: datasetId }))
        })
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    if (input.path) {
      createDatasetSubset({
        variables: {
          input: {
            ...input,
            datasetId,
          },
        },
      })
    } else if (input.upload) {
      setUploadFile(input.upload[0])
      uploadDatasetSubset({
        variables: {
          input: {
            language: input.language,
            datasetId,
          },
        },
      })
    }
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New {datasetId} Subset
        </h2>
      </header>
      <div className="rw-segment-main">
        <DatasetSubsetForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDatasetSubset
