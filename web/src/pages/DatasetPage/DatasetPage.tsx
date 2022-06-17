import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import DatasetSubsetsCell from 'src/components/DatasetSubsetsCell'

const DatasetPage = ({id}) => {
  return (
    <>
      <MetaTags title="Dataset" description="Dataset page" />

      <h1>{id}</h1>

      <DatasetSubsetsCell datasetId={id} />
    </>
  )
}

export default DatasetPage
