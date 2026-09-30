import styled from 'styled-components'

import { Meta } from '../components'
import { CurrentProjects, Hero, Skills } from '../sections'
import devices from '../styles/devices'

const Home = () => {
  return (
    <>
      <Meta
        title='Home | Linda Schönfeldt Portfolio'
        description='Linda Schönfeldt is a UX-minded frontend developer in Stockholm, building accessible, user-focused interfaces in React and TypeScript.'
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
