import styled from 'styled-components'

import { Hero } from '../sections/Hero'

const Home = () => {
  return (
    <Container>
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
