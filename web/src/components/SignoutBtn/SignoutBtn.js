import { Trans } from 'react-i18next'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

const SignoutBtn = () => {
  const { logOut } = useAuth()

  const onClick = async () => {
    await logOut()
    navigate(routes.home())
  }

  return (
    <button onClick={() => onClick()}>
      <Trans i18nKey="auth.signOut">Sign Out</Trans>
    </button>
  )
}

export default SignoutBtn
