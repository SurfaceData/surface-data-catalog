import type { FindDatasets } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Datasets from 'src/components/Dataset/Datasets'

export const QUERY = gql`
  query FindDatasets {
    datasets {
      id
      name
      language
      task
      path
      license
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No datasets yet. '}
      <Link
        to={routes.newDataset()}
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

export const Success = ({ datasets }: CellSuccessProps<FindDatasets>) => {
  return <Datasets datasets={datasets} />
}
