import DatasetSubsetCell from 'src/components/DatasetSubset/DatasetSubsetCell'

type DatasetSubsetPageProps = {
  id: string
}

const DatasetSubsetPage = ({ id, subsetId }: DatasetSubsetPageProps) => {
  return <DatasetSubsetCell id={id} subsetId={subsetId} />
}

export default DatasetSubsetPage
