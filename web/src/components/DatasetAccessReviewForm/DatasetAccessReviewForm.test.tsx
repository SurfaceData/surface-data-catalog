import { render } from '@redwoodjs/testing/web'

import DatasetAccessReviewForm from './DatasetAccessReviewForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DatasetAccessReviewForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DatasetAccessReviewForm />)
    }).not.toThrow()
  })
})
