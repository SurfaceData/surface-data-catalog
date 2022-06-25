import { Form, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import SurfaceSubmit from 'src/components/ui/SurfaceSubmit'
import { QUERY as FindDatasetAccessQuery } from 'src/components/DatasetAccess/DatasetAccessCell'

const REQUEST = gql`
  mutation RequestDatasetAccess($input: RequestDatasetAccessInput!) {
    requestDatasetAccess(input: $input) {
      status
    }
  }
`
const DatasetAccessForm = ({userId, datasetId}) => {
  const formMethods = useForm()
  const [requestAccess] = useMutation(REQUEST, {
    refetchQueries:[
      {
        query: FindDatasetAccessQuery,
        variables: {
          userId: userId,
          datasetId: datasetId,
        }
      }
    ],
  })
  const onSubmit = () => {
    requestAccess({
      variables: {
        input: {
          userId: userId,
          datasetId: datasetId,
        }
      }
    })
  }
  return (
    <Form
      className="mt-4 w-full"
      onSubmit={onSubmit}
      formMethods={formMethods}
    >
      <SurfaceSubmit $rounded $outline>
        Request Access
      </SurfaceSubmit>
    </Form>
  )
}

export default DatasetAccessForm
