import type { FindDatasetAccessQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import DatasetAccessForm from 'src/components/DatasetAccess/DatasetAccessForm'
import DownloadLinkCell from 'src/components/DownloadLinkCell'

export const QUERY = gql`
  query FindDatasetAccessQuery($userId: String!, $datasetId: String!) {
    datasetAccess: datasetAccess(userId: $userId, datasetId: $datasetId) {
      userId
      datasetId
      status
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = ({ userId, datasetId }) => (
    <DatasetAccessForm userId={userId} datasetId={datasetId} />
  )

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  datasetAccess,
  datasetId,
}: CellSuccessProps<FindDatasetAccessQuery>) => {
  const accessLabels = {
    1: 'Requested',
    2: 'Rejected',
    3: 'Granted',
  }
  return (
    <div>
      <div>Request Status: {accessLabels[datasetAccess.status]}</div>
      {datasetAccess.status === 3 && (
        <Link to={routes.dataset({ id: datasetId })}>Details</Link>
      )}
    </div>
  )
}
