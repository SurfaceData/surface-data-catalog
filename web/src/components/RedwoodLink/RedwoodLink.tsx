import { Link } from '@redwoodjs/router'

const RedwoodLink = React.forwardRef((props, ref) => {
  return <Link {...props} />
})

export default RedwoodLink
