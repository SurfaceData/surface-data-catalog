import { render } from '@redwoodjs/testing/web'

import SurfaceDetails from './SurfaceDetails'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SurfaceDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SurfaceDetails />)
    }).not.toThrow()
  })
})
