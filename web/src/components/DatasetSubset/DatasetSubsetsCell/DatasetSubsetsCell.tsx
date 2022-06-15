import type { FindDatasetSubsets } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import DatasetSubsets from 'src/components/DatasetSubset/DatasetSubsets'

export const QUERY = gql`
  query FindDatasetSubsets {
    datasetSubsets {
      id
      language
      path
      datasetId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No datasetSubsets yet. '}
      <Link
        to={routes.newDatasetSubset()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ datasetSubsets }: CellSuccessProps<FindDatasetSubsets>) => {
  return <DatasetSubsets datasetSubsets={datasetSubsets} />
}
