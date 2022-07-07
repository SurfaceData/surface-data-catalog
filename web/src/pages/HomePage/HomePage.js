import { Trans } from 'react-i18next'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import DatasetsCell from 'src/components/DatasetsCell'
import UserApiKeyCell from 'src/components/UserApiKeyCell'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div>
      {isAuthenticated && <UserApiKeyCell />}
      <DatasetsCell />
    </div>
  )
}

export default HomePage
