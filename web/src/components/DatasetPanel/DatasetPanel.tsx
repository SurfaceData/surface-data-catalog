import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Panel } from 'rsuite'

import  DatasetAccessCell from 'src/components/DatasetAccess/DatasetAccessCell'

const DatasetPanel = ({ dataset }) => {
  const { currentUser } = useAuth()
  return (
    <Panel header={dataset.name} bordered>
      <div>{dataset.task}</div>
      <div>{dataset.license}</div>
      <Link to={routes.dataset({ id: dataset.id })}>Details</Link>
      { currentUser ? (
        <DatasetAccessCell userId={currentUser.sub} datasetId={dataset.id} />
      ) : <></>
      }
    </Panel>
  )
}

export default DatasetPanel
