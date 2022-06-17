import DatasetCell from 'src/components/Dataset/DatasetCell'

type DatasetPageProps = {
  id: string
}

const DatasetPage = ({ id }: DatasetPageProps) => {
  return <DatasetCell id={id} />
}

export default DatasetPage
