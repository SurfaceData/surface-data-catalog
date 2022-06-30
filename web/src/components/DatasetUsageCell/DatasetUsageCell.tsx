import type { FindDatasetUsageQuery, FindDatasetUsageQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { CopyBlock, dracula } from 'react-code-blocks'

export const QUERY = gql`
  query FindUserApiKeyQuery {
    userApiKey: userApiKey {
      id
      key
    }
  }

`

export const Loading = () => <div></div>

  export const Empty = () => <div></div>

  export const Failure = ({
    error,
  }: CellFailureProps<FindDatasetUsageQueryVariables>) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

export const Success = ({
  userApiKey, datasetSubset,
}: CellSuccessProps<FindDatasetUsageQuery, FindDatasetUsageQueryVariables>) => {
  return <CopyBlock
    text={`from datasets import load_dataset
load_dataset('SurfaceData/${datasetSubset.dataset.task}_${datasetSubset.datasetId}',
             '${datasetSubset.language}',
             apikey='${userApiKey.key}')`
    }
    language='python'
    showLineNumbers
    wrapLines
    theme={dracula}
  />
}
