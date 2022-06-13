import ArrowLeftIcon from '@rsuite/icons/ArrowLeft'
import ArrowRightIcon from '@rsuite/icons/ArrowRight'
import { Nav, Navbar } from 'rsuite'

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar className="border-t-2" appearance="subtle">
      <Nav pullRight>
        <Nav.Item onClick={onChange}>
          {expand ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}

export default NavToggle
