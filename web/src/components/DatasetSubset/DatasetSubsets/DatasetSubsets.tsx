import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/DatasetSubset/DatasetSubsetsCell'

const DELETE_DATASET_SUBSET_MUTATION = gql`
  mutation DeleteDatasetSubsetMutation($id: String!) {
    deleteDatasetSubset(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const DatasetSubsetsList = ({ datasetSubsets }) => {
  const [deleteDatasetSubset] = useMutation(DELETE_DATASET_SUBSET_MUTATION, {
    onCompleted: () => {
      toast.success('DatasetSubset deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete datasetSubset ' + id + '?')) {
      deleteDatasetSubset({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Language</th>
            <th>Path</th>
            <th>Dataset id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {datasetSubsets.map((datasetSubset) => (
            <tr key={datasetSubset.id}>
              <td>{truncate(datasetSubset.id)}</td>
              <td>{truncate(datasetSubset.language)}</td>
              <td>{truncate(datasetSubset.path)}</td>
              <td>{truncate(datasetSubset.datasetId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.datasetSubset({ id: datasetSubset.id })}
                    title={'Show datasetSubset ' + datasetSubset.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDatasetSubset({ id: datasetSubset.id })}
                    title={'Edit datasetSubset ' + datasetSubset.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete datasetSubset ' + datasetSubset.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(datasetSubset.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DatasetSubsetsList
