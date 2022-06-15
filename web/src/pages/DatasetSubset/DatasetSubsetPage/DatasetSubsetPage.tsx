import DatasetSubsetCell from 'src/components/DatasetSubset/DatasetSubsetCell'

type DatasetSubsetPageProps = {
  id: string
}

const DatasetSubsetPage = ({ id }: DatasetSubsetPageProps) => {
  return <DatasetSubsetCell id={id} />
}

export default DatasetSubsetPage
