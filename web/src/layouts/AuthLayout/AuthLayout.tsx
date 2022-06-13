import { Trans } from 'react-i18next'
import { Link, routes } from '@redwoodjs/router';
import { Container, FlexboxGrid, Header, Navbar, Content, Footer } from 'rsuite';

import RedwoodLink from 'src/components/RedwoodLink'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Container className="flex flex-col h-screen justify-between">
      <Header>
        <Navbar>
          <Navbar.Brand as={RedwoodLink} to={routes.home()}>
            <Trans i18nKey="layouts.brand">Surface Redwood Template</Trans>
          </Navbar.Brand>
        </Navbar>
      </Header>
      <Content className="mb-auto h-10 p-4">
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            {children}
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <Footer>
      </Footer>
    </Container>
  );
}

export default AuthLayout
