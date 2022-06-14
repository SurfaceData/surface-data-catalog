import type { UserDownloadLogsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import {Stack} from 'rsuite'

import DownloadLogPanel from 'src/components/DownloadLogPanel'

export const QUERY = gql`
  query UserDownloadLogsQuery {
    userDownloadLogs {
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

export const Success = ({ userDownloadLogs }: CellSuccessProps<UserDownloadLogsQuery>) => {
  return (
    <Stack wrap spacing={8}>
      {userDownloadLogs.map((item) => {
        return <DownloadLogPanel key={item.id} downloadLog={item} />
      })}
    </Stack>
  )
}
