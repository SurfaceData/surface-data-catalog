import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'
import humanize from 'humanize-string'
import { useTranslation, Trans } from 'react-i18next'
import { Table } from 'rsuite'

import { QUERY } from 'src/components/Dataset/DatasetsCell'
import SurfaceButton from 'src/components/ui/SurfaceButton'

const DELETE_DATASET_MUTATION = gql`
  mutation DeleteDatasetMutation($id: String!) {
    deleteDataset(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const ActionCell = ({ rowData, onDeleteClick, ...props }) => {
  const { t } = useTranslation('translation')
  return (
    <Table.Cell {...props} style={{ padding: '6px' }}>
      <div className="p-1 flex gap-2">
        <Link
          to={routes.stewardDataset({ id: rowData.id })}
          title={'Show dataset ' + rowData.id + ' detail'}
          className="rw-button rw-button-small"
        >
          <Trans i18nKey="translation.show">Show</Trans>
        </Link>
        <Link
          to={routes.editDataset({ id: rowData.id })}
          title={'Edit dataset ' + rowData.id}
          className="rw-button rw-button-small rw-button-blue"
        >
          <Trans i18nKey="translation.edit">Edit</Trans>
        </Link>
        <button
          type="button"
          title={'Delete dataset ' + rowData.id}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDeleteClick(rowData.id)}
        >
          <Trans i18nKey="translation.delete">Delete</Trans>
        </button>
      </div>
    </Table.Cell>
  )
}

const DatasetsList = ({ datasets }) => {
  const [deleteDataset] = useMutation(DELETE_DATASET_MUTATION, {
    onCompleted: () => {
      toast.success('Dataset deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete dataset ' + id + '?')) {
      deleteDataset({ variables: { id } })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <SurfaceButton $rounded className="w-32">
        <Link
          to={routes.newDataset()}
          className="flex"
        >
          <div className="rw-button-icon">+</div> New Dataset
        </Link>
      </SurfaceButton>

      <Table data={datasets} autoHeight>
        <Table.Column width={150}>
          <Table.HeaderCell>
            <Trans i18nKey="translation.id">Id</Trans>
          </Table.HeaderCell>
          <Table.Cell dataKey="id" />
        </Table.Column>

        <Table.Column width={200}>
          <Table.HeaderCell>
            <Trans i18nKey="translation.name">Name</Trans>
          </Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>

        <Table.Column width={150}>
          <Table.HeaderCell>
            <Trans i18nKey="translation.task">Task</Trans>
          </Table.HeaderCell>
          <Table.Cell dataKey="task" />
        </Table.Column>

        <Table.Column width={150}>
          <Table.HeaderCell>
            <Trans i18nKey="translation.license">License</Trans>
          </Table.HeaderCell>
          <Table.Cell dataKey="license" />
        </Table.Column>

        <Table.Column width={200}>
          <Table.HeaderCell>
            <Trans i18nKey="translation.actions">Actions</Trans>
          </Table.HeaderCell>
          <ActionCell onDeleteClick={onDeleteClick} />
        </Table.Column>
      </Table>
    </div>
  )
}

export default DatasetsList
