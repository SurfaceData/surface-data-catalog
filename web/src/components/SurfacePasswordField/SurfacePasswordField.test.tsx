import { render } from '@redwoodjs/testing/web'

import SurfacePasswordField from './SurfacePasswordField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SurfacePasswordField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SurfacePasswordField />)
    }).not.toThrow()
  })
})
