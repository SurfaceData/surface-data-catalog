import { Trans } from 'react-i18next'
import { Form } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Panel } from 'rsuite'

import { SurfaceHeader2 } from 'src/components/ui/SurfaceHeader2'
import SurfacePasswordField from 'src/components/ui/SurfacePasswordField'
import SurfaceTextField from 'src/components/ui/SurfaceTextField'
import SurfaceSubmit from 'src/components/ui/SurfaceSubmit'

const SigninPage = () => {
  const { logIn } = useAuth()
  const [error, setError] = React.useState(null)

  const onSubmit = async (data) => {
    setError(null)
    try {
      const response = await logIn({
        email: data.email,
        password: data.password,
      })
      if (response?.error?.message) {
        setError(response.error.message)
      } else {
        navigate(routes.home())
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Panel
      bordered
      header={
        <SurfaceHeader2>
          <Trans i18nkey="translation.login">Login</Trans>
        </SurfaceHeader2>
      }
    >
      <Form onSubmit={onSubmit} className="p-4">
        {error && <p>{error}</p>}
        <SurfaceTextField name="email">
          <Trans i18nKey="translation.email">Email</Trans>
        </SurfaceTextField>

        <SurfacePasswordField name="password">
          <Trans i18nKey="translation.password">Password</Trans>
        </SurfacePasswordField>

        <SurfaceSubmit rounded>
          <Trans i18nKey="auth.signIn">Sign In</Trans>
        </SurfaceSubmit>
      </Form>
      <div>
        <Trans i18nKey="auth.newUser">
          New User? <Link to={routes.signup()}>Sign Up</Link>
        </Trans>
      </div>
    </Panel>
  )
}

export default SigninPage
