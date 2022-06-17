import { routes } from '@redwoodjs/router'
import PeoplesIcon from '@rsuite/icons/Peoples'
import { useState } from 'react'
import { Trans } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import {
  Container,
  Content,
  Header,
  Nav,
  Sidebar,
  Sidenav,
} from 'rsuite'

import Navigation from 'src/components/Navigation'
import NavToggle from 'src/components/NavToggle'
import RedwoodLink from 'src/components/RedwoodLink'
import SurfaceFooter from 'src/components/ui/SurfaceFooter'

type AdminLayoutProps = {
  children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 512px)' })
  const [expand, setExpand] = useState(!isTabletOrMobile)
  return (
    <Container className="flex-col h-screen justify-between">
      <Header>
        <Navigation />
      </Header>
      <Container>
        <Sidebar
          className="flex flex-col bg-slate-100"
          collapsible
          width={expand ? 260 : 56}
        >
          <Sidenav className="flex-1" expanded={expand} appearance="subtle">
            <Sidenav.Body>
              <Nav>
                <Nav.Item
                  as={RedwoodLink}
                  to={routes.adminManageUsers()}
                  icon={<PeoplesIcon />}
                >
                  <Trans i18nKey="layouts.adminManageUsers">
                    Manage Users
                  </Trans>
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>
        <Content className="flex-1 mb-auto p-4">{children}</Content>
      </Container>
      <SurfaceFooter />
    </Container>
  )
}

export default AdminLayout
