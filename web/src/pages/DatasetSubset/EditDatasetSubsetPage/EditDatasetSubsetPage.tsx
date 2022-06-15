import EditDatasetSubsetCell from 'src/components/DatasetSubset/EditDatasetSubsetCell'

type DatasetSubsetPageProps = {
  id: string
}

const EditDatasetSubsetPage = ({ id }: DatasetSubsetPageProps) => {
  return <EditDatasetSubsetCell id={id} />
}

export default EditDatasetSubsetPage
