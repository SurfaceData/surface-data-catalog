import { render } from '@redwoodjs/testing/web'

import ProfileDownloadLogsPage from './ProfileDownloadLogsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProfileDownloadLogsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileDownloadLogsPage />)
    }).not.toThrow()
  })
})
