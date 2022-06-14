import { render } from '@redwoodjs/testing/web'

import DownloadLogsPage from './DownloadLogsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DownloadLogsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadLogsPage />)
    }).not.toThrow()
  })
})
