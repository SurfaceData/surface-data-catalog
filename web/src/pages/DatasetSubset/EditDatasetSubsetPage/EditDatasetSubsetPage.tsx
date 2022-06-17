import EditDatasetSubsetCell from 'src/components/DatasetSubset/EditDatasetSubsetCell'

type DatasetSubsetPageProps = {
  id: string,
  subsetId: string,
}

const EditDatasetSubsetPage = ({ id, subsetId }: DatasetSubsetPageProps) => {
  return <EditDatasetSubsetCell id={id} subsetId={subsetId} />
}

export default EditDatasetSubsetPage
