import { Form } from '@redwoodjs/forms'

import SurfacePasswordField from './SurfacePasswordField'

export const generated = () => {
  return (
    <Form>
      <SurfacePasswordField name="password">Password</SurfacePasswordField>
    </Form>
  )
}

export default { title: 'Components/SurfacePasswordField' }
