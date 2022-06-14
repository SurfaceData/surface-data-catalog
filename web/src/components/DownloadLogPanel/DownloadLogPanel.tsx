import { Panel } from 'rsuite'

const DownloadLogPanel = ({ downloadLog }) => {
  return (
    <Panel header={downloadLog.createdAt} bordered>
      <div>{downloadLog.userId}</div>
      <div>{downloadLog.datasetId}</div>
      <div>{downloadLog.statusCode}</div>
    </Panel>
  )
}

export default DownloadLogPanel
