import styled from 'styled-components'

import SectionContainer from '../components/SectionContainer'

const Projects = () => {
  return (
    <SectionContainer id='projects'>
      <h1>Projects</h1>
      <Project>
        <h2>Web Development</h2>
        <p>Collection of my web development projects.</p>
      </Project>
      <Project>
        <h2>UX Design</h2>
        <p>Collection of my UX design projects.</p>
      </Project>
    </SectionContainer>
  )
}
export default Projects

const Project = styled.div`
  background-color: var(--primary-green);
  color: var(--primary-green-dark);
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  h2 {
    text-size: 1rem;
    line-height: 1;
    margin-bottom: 8px;
  }
`
