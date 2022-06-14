import { MetaTags } from '@redwoodjs/web'
import { Trans } from 'react-i18next'

import { SurfaceDetails, SurfaceSummary } from 'src/components/SurfaceDetails'
import { SurfaceHeader2 } from 'src/components/SurfaceHeader2'
import UserDownloadLogsCell from 'src/components/UserDownloadLogsCell'

const ProfileDownloadLogsPage = () => {
  return (
    <>
      <MetaTags title="ProfileDownloadLogs" description="ProfileDownloadLogs page" />

      <SurfaceHeader2>
        <Trans i18key="layouts.downloadLogs">Download Logs</Trans>
      </SurfaceHeader2>

      <SurfaceDetails>
        <SurfaceSummary>How this helps</SurfaceSummary>
        <div>
          <Trans i18key="translation.stewardDownloadSummary">
            These download logs track how many times you have downloaded
            particular datasets.
          </Trans>
        </div>
      </SurfaceDetails>

      <UserDownloadLogsCell />

    </>
  )
}

export default ProfileDownloadLogsPage
