import { Panel } from 'rsuite'

const DatasetPanel = ({ dataset }) => {
  return (
    <Panel header={dataset.name} bordered>
      <div>{dataset.language}</div>
      <div>{dataset.task}</div>
      <div>{dataset.license}</div>
    </Panel>
  )
}

export default DatasetPanel
