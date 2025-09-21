import styled from 'styled-components'

import devices from '../styles/devices'
import { ButtonGroup } from './buttonGroup'

export const ProjectCard = ({ project }) => {
  if (!project) return null

  // Transform github/netlify fields into actions array
  const actions = []
  if (project.github) {
    actions.push({ label: 'GitHub', url: project.github, type: 'github' })
  }
  if (project.netlify) {
    actions.push({ label: 'Live Site', url: project.netlify, type: 'netlify' })
  }

  return (
    <CardContent>
      <ImageContainer>
        <StyledImage
          src={project.image || 'tree.svg'}
          alt={project.alt || 'Project Image'}
        />
      </ImageContainer>
      <TextContainer>
        <StyledTitle>{project.title}</StyledTitle>
        <StyledDescription>{project.description}</StyledDescription>
        <LinkContainer>
          <ButtonGroup actions={actions} />
        </LinkContainer>
      </TextContainer>
    </CardContent>
  )
}

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  background: var(--background-light);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media ${devices.tablet} {
    flex-direction: row;
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--accent-orange); /* Fallback background color */

  @media ${devices.tablet} {
    width: 30%;
  }
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: transparent;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;

  @media ${devices.tablet} {
    width: 70%;
  }
`

const StyledTitle = styled.h3`
  margin: 0 0 10px 0;
  width: 100%;
`

const StyledDescription = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  width: 100%;
  box-sizing: border-box;
`

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  width: 10%;
`
