import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_DATASET_SUBSET_MUTATION = gql`
  mutation DeleteDatasetSubsetMutation($id: String!) {
    deleteDatasetSubset(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const DatasetSubset = ({ datasetSubset }) => {
  const [deleteDatasetSubset] = useMutation(DELETE_DATASET_SUBSET_MUTATION, {
    onCompleted: () => {
      toast.success('DatasetSubset deleted')
      navigate(routes.datasetSubsets())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete datasetSubset ' + id + '?')) {
      deleteDatasetSubset({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">DatasetSubset {datasetSubset.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{datasetSubset.id}</td>
            </tr><tr>
              <th>Language</th>
              <td>{datasetSubset.language}</td>
            </tr><tr>
              <th>Path</th>
              <td>{datasetSubset.path}</td>
            </tr><tr>
              <th>Dataset id</th>
              <td>{datasetSubset.datasetId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDatasetSubset({ id: datasetSubset.datasetId, subsetId: datasetSubset.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(datasetSubset.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default DatasetSubset
