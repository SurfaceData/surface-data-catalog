import type { FindDatasetSubsetById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import DatasetSubset from 'src/components/DatasetSubset/DatasetSubset'

export const QUERY = gql`
  query FindDatasetSubsetById($id: String!) {
    datasetSubset: datasetSubset(id: $id) {
      id
      language
      path
      datasetId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>DatasetSubset not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ datasetSubset }: CellSuccessProps<FindDatasetSubsetById>) => {
  return <DatasetSubset datasetSubset={datasetSubset} />
}
