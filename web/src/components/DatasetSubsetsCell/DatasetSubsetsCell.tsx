import type { DatasetSubsetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Button, SelectPicker, Table } from 'rsuite'

import DownloadLinkCell from 'src/components/DownloadLinkCell'

export const QUERY = gql`
  query DatasetSubsetsQuery($datasetId: String!) {
    datasetSubsets(datasetId: $datasetId) {
      id
      language
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <div>Empty</div>

  export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

const ActionCell = ({ rowData, ...props }) => {
  return (
    <Table.Cell {...props}>
      <DownloadLinkCell datasetId={rowData.id} />
    </Table.Cell>
  )
}

export const Success = ({ datasetSubsets }: CellSuccessProps<DatasetSubsetsQuery>) => {
  return (
    <Table data={datasetSubsets}>
      <Table.Column width={200}>
        <Table.HeaderCell>
          Id
        </Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column width={200}>
        <Table.HeaderCell>
          Language
        </Table.HeaderCell>
        <Table.Cell dataKey="language" />
      </Table.Column>

      <Table.Column width={200}>
        <Table.HeaderCell>
          Download Link
        </Table.HeaderCell>
        <ActionCell />
      </Table.Column>
    </Table>
  )
}
