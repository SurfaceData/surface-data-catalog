import { Trans } from 'react-i18next'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  const { isAuthenticated, currentUser, hasRole } = useAuth()
  console.log(currentUser)
  console.log(hasRole('admin'))

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Trans i18nKey="homeAuthenticated">Authenticated View</Trans>
        </div>
      ) : (
        <div>
          <Trans i18nKey="homeUnauthenticated">Unauthenticated View</Trans>
        </div>
      )}
    </>
  )
}

export default HomePage
