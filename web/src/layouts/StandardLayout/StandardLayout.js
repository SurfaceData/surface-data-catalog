import { Container, Header, Content } from 'rsuite'

import Navigation from 'src/components/Navigation'
import SurfaceFooter from 'src/components/SurfaceFooter'

const StandardLayout = ({ children }) => {
  return (
    <Container className="flex-col h-screen justify-between">
      <Header>
        <Navigation />
      </Header>
      <Content className="flex-1 mb-auto p-4">{children}</Content>
      <SurfaceFooter />
    </Container>
  )
}

export default StandardLayout
