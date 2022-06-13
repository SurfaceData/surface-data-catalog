import { Panel } from 'rsuite'

import DatasetAccessReviewForm from 'src/components/DatasetAccessReviewForm'

const DatasetAccessRequestPanel = ({ request }) => {
  return (
    <Panel header={request.datasetId} bordered>
      <div>{request.userId}</div>
      <DatasetAccessReviewForm request={request} />
    </Panel>
  )
}

export default DatasetAccessRequestPanel
