import { useAuth } from '@redwoodjs/auth'
import { Panel } from 'rsuite'

import  DatasetAccessCell from 'src/components/DatasetAccessCell'

const DatasetPanel = ({ dataset }) => {
  const { currentUser } = useAuth()
  return (
    <Panel header={dataset.name} bordered>
      <div>{dataset.task}</div>
      <div>{dataset.license}</div>
      <DatasetAccessCell userId={currentUser.sub} datasetId={dataset.id} />
    </Panel>
  )
}

export default DatasetPanel
