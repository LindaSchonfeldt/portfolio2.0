import styled from 'styled-components'

import Meta from '../components/Meta'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { SkillSection } from '../sections/SkillSection'

const Home = () => {
  return (
    <>
      <Meta
        title='Home | Linda Schönfeldt Portfolio'
        description="Welcome to Linda Schönfeldt's portfolio. Frontend developer and designer."
      />
      <HomeContainer>
        <Hero />
        <SkillSection />
        <Experience />
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
