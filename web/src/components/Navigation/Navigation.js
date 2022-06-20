import md5 from 'md5'
import { Trans } from 'react-i18next'
import { Link, navigate, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { Navbar, Nav, Dropdown } from 'rsuite'
import styled from 'styled-components'

import RedwoodLink from 'src/components/RedwoodLink'

const StyledProfile = styled.img`
  border-radius: 50%;
`

const ProfileButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  padding: 9px;
`

function getGravatarURL(email) {
  const address = String(email).trim().toLowerCase()
  const hash = md5(address)
  return `https://www.gravatar.com/avatar/${hash}`
}

const renderProfileIcon = (props, ref) => {
  const { user, ...rest } = props
  const image = user.image ? user.image : getGravatarURL(user.email)
  return (
    <ProfileButton {...rest} ref={ref}>
      <StyledProfile alt="Your Profile" src={image} height="32" width="32" />
    </ProfileButton>
  )
}

const UserItem = () => {
  const { isAuthenticated, currentUser, hasRole, logOut } = useAuth()
  if (isAuthenticated && currentUser) {
    return (
      <Dropdown
        placement="bottomEnd"
        title="Account"
        renderToggle={renderProfileIcon}
        user={currentUser}
      >
        <Dropdown.Item as={RedwoodLink} to={routes.profileInfo()}>
          <Trans i18nKey="layouts.profile">Profile</Trans>
        </Dropdown.Item>
        {hasRole(['admin', 'steward']) && (
          <Dropdown.Item as={RedwoodLink} to={routes.stewardReview()}>
            <Trans i18nKey="layouts.steward">Steward</Trans>
          </Dropdown.Item>
        )}
        {hasRole('admin') && (
          <Dropdown.Item as={RedwoodLink} to={routes.adminManageUsers()}>
            <Trans i18nKey="layouts.admin">Admin</Trans>
          </Dropdown.Item>
        )}
        <Dropdown.Item
          onSelect={async () => {
            await logOut()
            navigate(routes.home())
          }}
        >
          <Trans i18nKey="auth.signOut">Sign Out</Trans>
        </Dropdown.Item>
      </Dropdown>
    )
  }
  return (
    <Nav.Item as={RedwoodLink} to={routes.signin()}>
      <Trans i18nKey="auth.signIn">Sign In</Trans>
    </Nav.Item>
  )
}

const Navigation = () => {
  return (
    <Navbar className="p-4">
      <Navbar.Brand as={RedwoodLink} to={routes.home()}>
        <Trans i18nKey="layouts.brand">Surface Redwood Template</Trans>
      </Navbar.Brand>
      <Nav pullRight>
        <UserItem />
      </Nav>
    </Navbar>
  )
}

export default Navigation
