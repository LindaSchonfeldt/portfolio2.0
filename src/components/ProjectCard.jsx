import styled from 'styled-components'

import devices from '../styles/devices'
import { ButtonGroup } from './buttonGroup'
import { Tag } from './Tag'

export const ProjectCard = ({ project, size = 'medium' }) => {
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
    <CardContainer size={size}>
      <CardContent>
        <ImageContainer>
          <StyledImage
            src={project.image || 'tree.svg'}
            alt={project.alt || 'Project Image'}
          />
        </ImageContainer>
        <TextContainer>
          <TagContainer>
            {project.tags &&
              project.tags.map((tag, index) => <Tag key={index} text={tag} />)}
          </TagContainer>
          <StyledTitle>{project.title}</StyledTitle>
          <StyledDescription>{project.description}</StyledDescription>
          <LinkContainer>
            <ButtonGroup actions={actions} />
          </LinkContainer>
        </TextContainer>
      </CardContent>
    </CardContainer>
  )
}

const sizeStyles = {
  small: {
    width: '220px',
    height: '180px',
    padding: '1rem',
    fontSize: '0.9rem',
    background: 'var(--primary-green-light)'
  },
  medium: {
    width: '320px',
    height: '240px',
    padding: '1.5rem',
    fontSize: '1rem',
    background: 'var(--background-light)'
  },
  large: {
    width: '420px',
    height: '320px',
    padding: '2rem',
    fontSize: '1.15rem',
    background: 'var(--accent-orange)'
  }
}

const CardContainer = styled.div`
  width: ${({ size }) => sizeStyles[size].width};
  height: ${({ size }) => sizeStyles[size].height};
  padding: ${({ size }) => sizeStyles[size].padding};
  font-size: ${({ size }) => sizeStyles[size].fontSize};
  background: ${({ size }) => sizeStyles[size].background};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
  transition: box-shadow 0.2s;

  @media ${devices.tablet} {
    flex-direction: column;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  background: var(--background-light);

  @media ${devices.tablet} {
    flex-direction: column;
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--accent-orange); /* Fallback background color */
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
`

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
  width: 100%;
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
  justify-content: flex-start;
  width: 100%;
  margin-top: 1.5rem;

  @media ${devices.tablet} {
    flex-direction: row;
    justify-content: flex-start;
  }
`
