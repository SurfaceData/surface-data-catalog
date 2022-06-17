import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Trans } from 'react-i18next'

import DatasetAccessRequestsCell from 'src/components/DatasetAccessRequestsCell'
import { SurfaceDetails, SurfaceSummary } from 'src/components/SurfaceDetails'
import { SurfaceHeader2 } from 'src/components/SurfaceHeader2'

const StewardReviewPage = () => {
  return (
    <>
      <MetaTags title="StewardReview" description="StewardReview page" />

      <SurfaceHeader2>
        <Trans i18key="translation.stewardTasks">Steward Tasks</Trans>
      </SurfaceHeader2>

      <SurfaceDetails>
        <SurfaceSummary>How Stewards Help</SurfaceSummary>
        <div>
          <Trans i18key="translation.stewardSummary">
            Stewards help look after the community and all associated datasets.
          </Trans>
        </div>
      </SurfaceDetails>

      <DatasetAccessRequestsCell />
    </>
  )
}

export default StewardReviewPage
