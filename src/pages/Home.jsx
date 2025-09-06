import styled from 'styled-components'
import { Hero } from '../sections/Hero'
import { SkillSection } from '../sections/SkillSection'

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
      <SkillSection />
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export default Home
