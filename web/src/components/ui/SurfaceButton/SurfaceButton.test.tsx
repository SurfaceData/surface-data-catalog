import { render } from '@redwoodjs/testing/web'

import SurfaceButton from './SurfaceButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SurfaceButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SurfaceButton />)
    }).not.toThrow()
  })
})
