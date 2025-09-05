import styled from 'styled-components'
import { HamburgerMenu } from '../components/HamburgerMenu'

import { Hero } from '../sections/Hero'

const Home = () => {
  return (
    <Container>
      <HamburgerMenu />
      <Hero />
    </Container>
  )
}
export default Home

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
`
