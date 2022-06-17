import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import DatasetSubsetsCell from 'src/components/DatasetSubset/DatasetSubsetsCell'

const DELETE_DATASET_MUTATION = gql`
  mutation DeleteDatasetMutation($id: String!) {
    deleteDataset(id: $id) {
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

const Dataset = ({ dataset }) => {
  const [deleteDataset] = useMutation(DELETE_DATASET_MUTATION, {
    onCompleted: () => {
      toast.success('Dataset deleted')
      navigate(routes.datasets())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete dataset ' + id + '?')) {
      deleteDataset({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Dataset {dataset.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{dataset.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{dataset.name}</td>
            </tr><tr>
              <th>Task</th>
              <td>{dataset.task}</td>
            </tr><tr>
              <th>License</th>
              <td>{dataset.license}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDataset({ id: dataset.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(dataset.id)}
        >
          Delete
        </button>
        <Link
          to={routes.newDatasetSubset({ id: dataset.id })}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New DatasetSubset
        </Link>

      </nav>

      <DatasetSubsetsCell datasetId={dataset.id} />
    </>
  )
}

export default Dataset
