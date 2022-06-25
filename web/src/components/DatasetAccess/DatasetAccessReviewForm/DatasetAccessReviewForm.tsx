import { Form, SelectField, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { QUERY as DatasetAccessRequestsQuery } from 'src/components/DatasetAccess/DatasetAccessRequestsCell'
import SurfaceSubmit from 'src/components/ui/SurfaceSubmit'

const UPDATE = gql`
  mutation UpdateDatasetAccess($id: Int!, $input: UpdateDatasetAccessInput!) {
    updateDatasetAccess(id: $id, input: $input) {
      status
    }
  }
`

const DatasetAccessReviewForm = ({ request }) => {
  const formMethods = useForm()
  const [updateAccess] = useMutation(UPDATE, {
    refetchQueries:[
      {
        query: DatasetAccessRequestsQuery,
      }
    ],
  })
  const onSubmit = (input) => {
    console.log(input)
    updateAccess({
      variables: {
        id: request.id,
        input: {
          status: parseInt(input.status),
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
      <SelectField name="status" defaultValue={request.status}>
        <option value="1">Requested</option>
        <option value="2">Reject</option>
        <option value="3">Approve</option>
      </SelectField>

      <SurfaceSubmit $rounded $outline>
        Set Access
      </SurfaceSubmit>
    </Form>
  )
}

export default DatasetAccessReviewForm
