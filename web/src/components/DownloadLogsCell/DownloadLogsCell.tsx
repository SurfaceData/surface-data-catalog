import type { DownloadLogsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Stack } from 'rsuite'

import DownloadLogPanel from 'src/components/DownloadLogPanel'

export const QUERY = gql`
  query DownloadLogsQuery {
    downloadLogs {
      id
      userId
      datasetId
      statusCode
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <div>Empty</div>

  export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

export const Success = ({ downloadLogs }: CellSuccessProps<DownloadLogsQuery>) => {
  return (
    <Stack spacing={8} wrap>
      {downloadLogs.map((item) => {
        return <DownloadLogPanel key={item.id} downloadLog={item} />
      })}
    </Stack>
  )
}
