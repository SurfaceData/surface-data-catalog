import type { FindDatasetById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Panel, Tag } from 'rsuite'
import ReactMarkdown from 'react-markdown'

export const QUERY = gql`
  query FindDatasetById($id: String!) {
    dataset: dataset(id: $id) {
      id
      name
      task
      license
      readme
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <div>Empty</div>

  export const Failure = ({ error }: CellFailureProps) => (
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  )

export const Success = ({ dataset }: CellSuccessProps<FindDatasetById>) => {
  return (
    <Panel header={dataset.id}>
      <Tag>{dataset.license}</Tag>
      <Tag>{dataset.task}</Tag>
      <ReactMarkdown>{dataset.readme}</ReactMarkdown>
    </Panel>
  )
}
