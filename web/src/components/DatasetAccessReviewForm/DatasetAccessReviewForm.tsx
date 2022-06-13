import { Form, SelectField, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { QUERY as DatasetAccessRequestsQuery } from 'src/components/DatasetAccessRequestsCell'
import SurfaceSubmit from 'src/components/SurfaceSubmit'

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
    updateAccess({
      variables: {
        id: request.id,
        input: {
          status: input.statu,
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
      <SelectField name="status" value={request.status}>
        <option value="1">Requested</option>
        <option value="2">Reject</option>
        <option value="3">Approve</option>
      </SelectField>

      <SurfaceSubmit rounded="true" outline="true">
        Set Access
      </SurfaceSubmit>
    </Form>
  )
}

export default DatasetAccessReviewForm
