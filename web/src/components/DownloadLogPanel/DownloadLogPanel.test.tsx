import { render } from '@redwoodjs/testing/web'

import DownloadLogPanel from './DownloadLogPanel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DownloadLogPanel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadLogPanel />)
    }).not.toThrow()
  })
})
