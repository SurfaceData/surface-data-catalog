import type { FindDownloadLinkQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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

  export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

export const Success = ({ userApiKey, datasetId }: CellSuccessProps<FindDownloadLinkQuery>) => {
  const url = `${global.RWJS_API_URL}/download?apikey=${userApiKey.key}&dataset=${datasetId}`
  return (<a href={url}>download</a>)
}
