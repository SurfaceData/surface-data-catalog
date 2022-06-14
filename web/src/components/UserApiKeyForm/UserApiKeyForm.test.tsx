import { render } from '@redwoodjs/testing/web'

import UserApiKeyForm from './UserApiKeyForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserApiKeyForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserApiKeyForm />)
    }).not.toThrow()
  })
})
