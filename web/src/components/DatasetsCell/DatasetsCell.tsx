import type { DatasetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Stack } from 'rsuite'

import DatasetPanel from 'src/components/DatasetPanel'

export const QUERY = gql`
  query DatasetsQuery {
    allDatasets {
      id
      name
      task
      license
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <div>Empty</div>

  export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

export const Success = ({ allDatasets }: CellSuccessProps<DatasetsQuery>) => {
  return (
    <Stack wrap spacing={8}>
      {allDatasets.map((item) => {
        return (
          <DatasetPanel key={item.id} dataset={item} />
        )
      })}
    </Stack>
  )
}
