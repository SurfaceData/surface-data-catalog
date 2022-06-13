import { render } from '@redwoodjs/testing/web'

import DatasetPanel from './DatasetPanel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DatasetPanel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DatasetPanel />)
    }).not.toThrow()
  })
})
