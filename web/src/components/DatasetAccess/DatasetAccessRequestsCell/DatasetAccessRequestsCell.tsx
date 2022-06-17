import type { DatasetAccessRequestsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Stack } from 'rsuite'

import DatasetAccessRequestPanel from 'src/components/DatasetAccess/DatasetAccessRequestPanel'

export const QUERY = gql`
  query DatasetAccessRequestsQuery {
    datasetAccesses{
      id
      userId
      datasetId
      status
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <div>Empty</div>

  export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

export const Success = ({ datasetAccesses }: CellSuccessProps<DatasetAccessRequestsQuery>) => {
  return (
    <Stack wrap spacing={8}>
      {datasetAccesses.map((item) => {
        return <DatasetAccessRequestPanel key={item.id} request={item} />
      })}
    </Stack>
  )
}
