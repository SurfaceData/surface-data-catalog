import { Trans } from 'react-i18next'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import DatasetsCell from 'src/components/DatasetsCell'

const HomePage = () => {
  const { isAuthenticated, currentUser, hasRole } = useAuth()
  console.log(currentUser)
  console.log(hasRole('admin'))

  return (
    <>
      {isAuthenticated ? (
        <DatasetsCell />
      ) : (
        <div>
          <Trans i18nKey="homeUnauthenticated">Unauthenticated View</Trans>
        </div>
      )}
    </>
  )
}

export default HomePage
