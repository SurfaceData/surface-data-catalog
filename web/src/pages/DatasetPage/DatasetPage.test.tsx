import { render } from '@redwoodjs/testing/web'

import DatasetPage from './DatasetPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DatasetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DatasetPage />)
    }).not.toThrow()
  })
})
