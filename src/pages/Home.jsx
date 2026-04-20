import styled from 'styled-components'

import { Meta } from '../components'
import { Hero, Skills, CurrentProjects } from '../sections'

const Home = () => {
  return (
    <>
      <Meta
        title='Home | Linda Schönfeldt Portfolio'
        description="Welcome to Linda Schönfeldt's portfolio. Frontend developer with a background in interaction design."
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
`

export default Home
