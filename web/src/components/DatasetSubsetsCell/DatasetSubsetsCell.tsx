import type { DatasetSubsetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import MinusRoundIcon from '@rsuite/icons/MinusRound'
import PlusRoundIcon from '@rsuite/icons/PlusRound'
import { useState } from 'react'
import { Button, IconButton, SelectPicker, Table } from 'rsuite'

import DatasetUsageCell from 'src/components/DatasetUsageCell'
import DownloadLinkCell from 'src/components/DownloadLinkCell'

export const QUERY = gql`
  query DatasetSubsetsQuery($datasetId: String!) {
    datasetSubsets(datasetId: $datasetId) {
      id
      language
      datasetId
      dataset {
        task
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <div>Empty</div>

  export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
  <Table.Cell {...props}>
    <IconButton
      size="xs"
      appearance="subtle"
      onClick={() => {onChange(rowData)}}
      icon={
        expandedRowKeys.some((key) =>
        key === rowData['id']) ? <MinusRoundIcon /> : <PlusRoundIcon />
      }
    />
  </Table.Cell>
)

const renderRowExpanded = (rowData) => {
  return (
    <div>
      <div>Huggingface Usage:</div>
      <DatasetUsageCell datasetSubset={rowData} />
    </div>
  )
}

const ActionCell = ({ rowData, ...props }) => {
  return (
    <Table.Cell {...props}>
      <DownloadLinkCell datasetId={rowData.id} />
    </Table.Cell>
  )
}

export const Success = ({ datasetSubsets }: CellSuccessProps<DatasetSubsetsQuery>) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

  const handleExpanded = (rowData, rowKey) => {
    let open = false;
    const nextExpandedRowKeys = [];
    expandedRowKeys.forEach((key) => {
      if (key == rowData['id']) {
        open = true
      } else {
        nextExpandedRowKeys.push(key)
      }
    })

    if (!open) {
      nextExpandedRowKeys.push(rowData['id'])
    }
    setExpandedRowKeys(nextExpandedRowKeys)
  }
  return (
    <Table
      data={datasetSubsets}
      rowKey={'id'}
      expandedRowKeys={expandedRowKeys}
      autoHeight
      renderRowExpanded={renderRowExpanded}
      rowExpandedHeight={250}
    >
      <Table.Column width={50} align="center">
        <Table.HeaderCell>#</Table.HeaderCell>
        <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
      </Table.Column>

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
