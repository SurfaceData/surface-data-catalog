import EditDatasetCell from 'src/components/Dataset/EditDatasetCell'

type DatasetPageProps = {
  id: string
}

const EditDatasetPage = ({ id }: DatasetPageProps) => {
  return <EditDatasetCell id={id} />
}

export default EditDatasetPage
