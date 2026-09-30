import styled from 'styled-components'

import { Meta } from '../components'
import { CurrentProjects, Hero, Skills } from '../sections'
import devices from '../styles/devices'

const Home = () => {
  return (
    <>
      <Meta
        title='Home | Linda Schönfeldt Portfolio'
        description="Welcome to Linda Schönfeldt's portfolio. Frontend Developer with a background in Interaction Design."
      />
      <HomeContainer>
        <Hero />
        <Skills />
        <CurrentProjects />
      </HomeContainer>
    </>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h2 {
    font-size: 2rem;

    @media ${devices.tablet} {
      font-size: 2.5rem;
    }

    @media ${devices.laptop} {
      font-size: 3rem;
    }
  }
`

export default Home
