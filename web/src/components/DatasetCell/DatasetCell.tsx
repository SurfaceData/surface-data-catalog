import type { FindDatasetQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindDatasetQuery($id: String!) {
    dataset: dataset(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ dataset }: CellSuccessProps<FindDatasetQuery>) => {
  return <div>{JSON.stringify(dataset)}</div>
}
