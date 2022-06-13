import { render } from '@redwoodjs/testing/web'

import RedwoodLink from './RedwoodLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RedwoodLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RedwoodLink />)
    }).not.toThrow()
  })
})
