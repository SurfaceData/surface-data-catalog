import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import PublicDatasetDetailsCell from 'src/components/PublicDatasetDetailsCell'
import DatasetSubsetsCell from 'src/components/DatasetSubsetsCell'

const DatasetPage = ({id}) => {
  return (
    <>
      <MetaTags title="Dataset" description="Dataset page" />

      <PublicDatasetDetailsCell id={id} />

      <DatasetSubsetsCell datasetId={id} />
    </>
  )
}

export default DatasetPage
