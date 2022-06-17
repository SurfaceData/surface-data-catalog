import { useAuth } from '@redwoodjs/auth'
import { Form } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Trans, useTranslation } from 'react-i18next'

import { SurfaceDetails, SurfaceSummary } from 'src/components/SurfaceDetails'
import { SurfaceHeader2 } from 'src/components/SurfaceHeader2'
import SurfaceTextField from 'src/components/SurfaceTextField'

const ProfileInfoPage = () => {
  const { currentUser } = useAuth()
  const { t } = useTranslation('admin')
  const roleLabels = {
    admin: t('rolesAdmin'),
    steward: t('rolesSteward'),
    general: t('rolesGeneral'),
  }
  return (
    <>
      <MetaTags title="ProfileInfo" description="ProfileInfo page" />

      <SurfaceHeader2>
        <Trans i18key="translation.profile">Profile</Trans>
      </SurfaceHeader2>

      <SurfaceDetails>
        <SurfaceSummary>How this helps</SurfaceSummary>
        <div>
          <Trans i18key="translation.profileSummary">
            Contact information helps us stay in communication
          </Trans>
        </div>
      </SurfaceDetails>
      <Form>
        <SurfaceTextField
          name="email"
          readOnly
          value={currentUser?.email || ''}
        >
          <Trans i18nKey="translation.email">Email</Trans>
        </SurfaceTextField>

        <SurfaceTextField
          name="role"
          readOnly
          value={roleLabels[currentUser?.roles[0] || 'general']}
        >
          <Trans i18nKey="translation.role">Role</Trans>
        </SurfaceTextField>
      </Form>
    </>
  )
}

export default ProfileInfoPage
