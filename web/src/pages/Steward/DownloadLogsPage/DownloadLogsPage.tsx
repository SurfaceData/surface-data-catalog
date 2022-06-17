import { MetaTags } from '@redwoodjs/web'
import { Trans } from 'react-i18next'

import { SurfaceDetails, SurfaceSummary } from 'src/components/ui/SurfaceDetails'
import { SurfaceHeader2 } from 'src/components/ui/SurfaceHeader2'
import DownloadLogsCell from 'src/components/DownloadLogsCell'

const DownloadLogsPage = () => {
  return (
    <>
      <MetaTags title="DownloadLogs" description="DownloadLogs page" />

      <SurfaceHeader2>
        <Trans i18key="layouts.downloadLogs">Download Logs</Trans>
      </SurfaceHeader2>

      <SurfaceDetails>
        <SurfaceSummary>How this helps</SurfaceSummary>
        <div>
          <Trans i18key="translation.stewardDownloadSummary">
            These download logs track how many times all users have downloaded
            particular datasets.
          </Trans>
        </div>
      </SurfaceDetails>

      <DownloadLogsCell />
    </>
  )
}

export default DownloadLogsPage
