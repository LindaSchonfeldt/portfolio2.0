import styled from 'styled-components'

import { Button, ProjectCard, SectionContainer } from '../components'
import projectsData from '../data/projects.json'

const currentProjects = projectsData.projects.filter((p) => p.current)

export const CurrentProjects = () => {
  return (
    <SectionContainer id='currentProjects'>
      <ContentContainer>
        <h2>What I'm Building</h2>
        <ProjectContainer>
          {currentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              size={project.size}
              showCurrentBadge={false}
              fullRow={true}
            />
          ))}
        </ProjectContainer>
        <Button
          variant='secondary'
          label={'View all projects'}
          className=''
          url='/projects'
          aria-label='View all projects'
        />
      </ContentContainer>
    </SectionContainer>
  )
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  align-items: flex-start;
`

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`
