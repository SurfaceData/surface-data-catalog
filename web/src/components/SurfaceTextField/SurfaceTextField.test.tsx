import { render } from '@redwoodjs/testing/web'

import SurfaceTextField from './SurfaceTextField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SurfaceTextField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SurfaceTextField />)
    }).not.toThrow()
  })
})
