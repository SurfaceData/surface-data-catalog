import { render } from '@redwoodjs/testing/web'

import DatasetAccessForm from './DatasetAccessForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DatasetAccessForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DatasetAccessForm />)
    }).not.toThrow()
  })
})
