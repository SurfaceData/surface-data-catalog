import type { FindDatasetById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Dataset from 'src/components/Dataset/Dataset'

export const QUERY = gql`
  query FindDatasetById($id: String!) {
    dataset: dataset(id: $id) {
      id
      name
      task
      license
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <div>Dataset not found</div>

  export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error.message}</div>
  )

export const Success = ({ dataset }: CellSuccessProps<FindDatasetById>) => {
  return <Dataset dataset={dataset} />
}
