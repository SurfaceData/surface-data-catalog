import { useAuth } from '@redwoodjs/auth'
import { Form, useForm } from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Trans } from 'react-i18next'

import SurfacePasswordField from 'src/components/ui/SurfacePasswordField'
import SurfaceSubmit from 'src/components/ui/SurfaceSubmit'

const UpdatePasswordForm = () => {
  const { client } = useAuth()
  const formMethods = useForm()
  const onSubmit = async (input) => {
    const { user, error } = client.auth.update({
      password: input.newPassword,
    })
    if (error) {
      toast.success('Thank you for linking your blog')
    } else {
      toast.success('Email Updated')
      formMethods.reset()
    }
  }

  return (
    <div>
      <Toaster />

      <Form
        className="mt-4 w-full"
        onSubmit={onSubmit}
        formMethods={formMethods}
      >
        <SurfacePasswordField name="password" validation={{ required: true }}>
          <Trans i18nKey="translation.newPassword">New Password</Trans>
        </SurfacePasswordField>

        <SurfaceSubmit rounded outline>
          <Trans i18nKey="auth.updatePassword">Update Password</Trans>
        </SurfaceSubmit>
      </Form>
    </div>
  )
}

export default UpdatePasswordForm
