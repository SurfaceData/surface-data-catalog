import { Private, Router, Route, Set } from '@redwoodjs/router'
import DatasetsLayout from 'src/layouts/DatasetsLayout'

import AdminLayout from 'src/layouts/AdminLayout'
import AuthLayout from 'src/layouts/AuthLayout'
import ProfileLayout from 'src/layouts/ProfileLayout'
import StandardLayout from 'src/layouts/StandardLayout'
import StewardLayout from 'src/layouts/StewardLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AuthLayout}>
        <Route path="/signin" page={SigninPage} name="signin" />
        <Route path="/signup" page={SignupPage} name="signup" />
      </Set>
      <Private unauthenticated="home">
        <Set wrap={ProfileLayout}>
          <Route path="/profile/info" page={ProfileInfoPage} name="profileInfo" />
          <Route path="/profile/account-settings" page={ProfileAccountSettingsPage} name="profileAccountSettings" />
        </Set>
      </Private>
      <Private unauthenticated="home" roles={['admin', 'steward']}>
        <Set wrap={StewardLayout}>
          <Route path="/steward/review" page={StewardReviewPage} name="stewardReview" />
        </Set>
        <Set wrap={DatasetsLayout}>
          <Route path="/datasets/new" page={DatasetNewDatasetPage} name="newDataset" />
          <Route path="/datasets/{id}/edit" page={DatasetEditDatasetPage} name="editDataset" />
          <Route path="/datasets/{id}" page={DatasetDatasetPage} name="dataset" />
          <Route path="/datasets" page={DatasetDatasetsPage} name="datasets" />
        </Set>
      </Private>
      <Private unauthenticated="home" roles="admin">
        <Set wrap={AdminLayout}>
          <Route path="/admin/manage-users" page={AdminManageUsersPage} name="adminManageUsers" />
        </Set>
      </Private>
      <Set wrap={StandardLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
