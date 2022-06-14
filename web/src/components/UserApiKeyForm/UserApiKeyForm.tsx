import { Form, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { QUERY as FindUserApiKeyQuery } from 'src/components/UserApiKeyCell'
import SurfaceSubmit from 'src/components/SurfaceSubmit'

const REQUEST = gql`
  mutation CreateUserApiKey {
    createUserApiKey {
      id
      key
    }
  }
`

const UserApiKeyForm = () => {
  const formMethods = useForm()
  const [createUserApiKey] = useMutation(REQUEST, {
    refetchQueries:[
      {
        query: FindUserApiKeyQuery,
      }
    ],
  })
  const onSubmit = () => {
    createUserApiKey()
  }
  return (
    <Form
      className="mt-4 w-full"
      onSubmit={onSubmit}
      formMethods={formMethods}
    >
      <SurfaceSubmit rounded="true" outline="true">
        Create API Key
      </SurfaceSubmit>
    </Form>
  )
}

export default UserApiKeyForm
