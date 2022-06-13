import { render } from '@redwoodjs/testing/web'

import NavToggle from './NavToggle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavToggle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavToggle />)
    }).not.toThrow()
  })
})
