import { render } from '@redwoodjs/testing/web'

import SurfaceSubmit from './SurfaceSubmit'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SurfaceSubmit', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SurfaceSubmit />)
    }).not.toThrow()
  })
})
