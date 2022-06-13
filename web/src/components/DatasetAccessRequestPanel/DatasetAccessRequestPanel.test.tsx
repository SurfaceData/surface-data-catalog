import { render } from '@redwoodjs/testing/web'

import DatasetAccessRequestPanel from './DatasetAccessRequestPanel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DatasetAccessRequestPanel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DatasetAccessRequestPanel />)
    }).not.toThrow()
  })
})
