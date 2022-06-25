import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'
import { useTranslation, Trans } from 'react-i18next'
import { Table } from 'rsuite'

import { QUERY } from 'src/components/DatasetSubset/DatasetSubsetsCell'
import SurfaceButton from 'src/components/ui/SurfaceButton'

const DELETE_DATASET_SUBSET_MUTATION = gql`
  mutation DeleteDatasetSubsetMutation($id: String!) {
    deleteDatasetSubset(id: $id) {
      id
    }
  }
`

const ActionCell = ({ rowData, onDeleteClick, ...props }) => {
  const { t } = useTranslation('translation')
  return (
    <Table.Cell {...props} style={{ padding: '6px' }}>
      <div className="p-1 flex gap-2">
        <Link
          to={routes.datasetSubset({ id: rowData.datasetId, subsetId: rowData.id })}
          title={'Show datasetSubset ' + rowData.id + ' detail'}
          className="rw-button rw-button-small"
        >
          <Trans i18nKey="translation.show">Show</Trans>
        </Link>
        <Link
          to={routes.editDatasetSubset({ id: rowData.datasetId, subsetId: rowData.id })}
          title={'Edit datasetSubset ' + rowData.id}
          className="rw-button rw-button-small rw-button-blue"
        >
          <Trans i18nKey="translation.edit">Edit</Trans>
        </Link>
        <button
          type="button"
          title={'Delete datasetSubset ' + rowData.id}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDeleteClick(rowData.id)}
        >
          <Trans i18nKey="translation.delete">Delete</Trans>
        </button>
      </div>
    </Table.Cell>
  )
}

const DatasetSubsetsList = ({ datasetSubsets }) => {
  const [deleteDatasetSubset] = useMutation(DELETE_DATASET_SUBSET_MUTATION, {
    onCompleted: () => {
      toast.success('DatasetSubset deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
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
      <Table data={datasetSubsets} autoHeight>
        <Table.Column width={150}>
          <Table.HeaderCell>
            <Trans i18nKey="translation.id">Id</Trans>
          </Table.HeaderCell>
          <Table.Cell dataKey="id" />
        </Table.Column>
        <Table.Column width={100}>
          <Table.HeaderCell>
            <Trans i18nKey="translation.language">Language</Trans>
          </Table.HeaderCell>
          <Table.Cell dataKey="language" />
        </Table.Column>
        <Table.Column width={350}>
          <Table.HeaderCell>
            <Trans i18nKey="translation.path">Path</Trans>
          </Table.HeaderCell>
          <Table.Cell dataKey="path" />
        </Table.Column>
        <Table.Column width={100}>
          <Table.HeaderCell>
            <Trans i18nKey="translation.datasetId">Dataset ID</Trans>
          </Table.HeaderCell>
          <Table.Cell dataKey="datasetId" />
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

export default DatasetSubsetsList
