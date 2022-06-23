import { Private, Router, Route, Set } from '@redwoodjs/router'

import AdminLayout from 'src/layouts/AdminLayout'
import AuthLayout from 'src/layouts/AuthLayout'
import ProfileLayout from 'src/layouts/ProfileLayout'
import StandardLayout from 'src/layouts/StandardLayout'
import StewardLayout from 'src/layouts/StewardLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AuthLayout}>
        <Route path="/signin" page={AuthSigninPage} name="signin" />
        <Route path="/signup" page={AuthSignupPage} name="signup" />
      </Set>
      <Private unauthenticated="home">
        <Set wrap={ProfileLayout}>
          <Route path="/profile/info" page={ProfileProfileInfoPage} name="profileInfo" />
          <Route path="/profile/account-settings" page={ProfileProfileAccountSettingsPage} name="profileAccountSettings" />
          <Route path="/profile/download-logs" page={ProfileProfileDownloadLogsPage} name="profileDownloadLogs" />
        </Set>
      </Private>
      <Private unauthenticated="home" roles={['admin', 'steward']}>
        <Set wrap={StewardLayout}>
          <Route path="/steward/review" page={StewardStewardReviewPage} name="stewardReview" />
          <Route path="/steward/datasets" page={StewardDatasetsPage} name="datasets" />
          <Route path="/steward/datasets/new" page={StewardNewDatasetPage} name="newDataset" />
          <Route path="/steward/datasets/{id}" page={StewardDatasetPage} name="stewardDataset" />
          <Route path="/steward/datasets/{id}/edit" page={StewardEditDatasetPage} name="editDataset" />
          <Route path="/steward/datasets/{id}/new-subset" page={StewardNewDatasetSubsetPage} name="newDatasetSubset" />
          <Route path="/steward/datasets/{id}/subsets/{subsetId}" page={StewardDatasetSubsetPage} name="datasetSubset" />
          <Route path="/steward/datasets/{id}/subsets/{subsetId}/edit" page={StewardEditDatasetSubsetPage} name="editDatasetSubset" />
          <Route path="/steward/download-logs" page={StewardDownloadLogsPage} name="stewardDownloadLogs" />
        </Set>
      </Private>
      <Private unauthenticated="home" roles="admin">
        <Set wrap={AdminLayout}>
          <Route path="/admin/manage-users" page={AdminAdminManageUsersPage} name="adminManageUsers" />
        </Set>
      </Private>
      <Set wrap={StandardLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/dataset/{id}" page={DatasetPage} name="dataset" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
