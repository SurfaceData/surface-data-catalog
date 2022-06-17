import { render } from '@redwoodjs/testing/web'

import SurfaceHeader2 from './SurfaceHeader2'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SurfaceHeader2', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SurfaceHeader2 />)
    }).not.toThrow()
  })
})
