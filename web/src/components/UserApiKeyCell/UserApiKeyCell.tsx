import type { FindUserApiKeyQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Tag } from 'rsuite'

import UserApiKeyForm from 'src/components/UserApiKeyForm'

export const QUERY = gql`
  query FindUserApiKeyQuery {
    userApiKey: userApiKey {
      id
      key
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <UserApiKeyForm />

  export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

export const Success = ({
  userApiKey,
}: CellSuccessProps<FindUserApiKeyQuery>) => {
  return <Tag size="lg">{userApiKey.key}</Tag>
}
