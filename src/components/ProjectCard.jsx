import styled from 'styled-components'

import devices from '../styles/devices'
import { ButtonGroup } from './buttonGroup'
import { ReadMore } from './ReadMore'
import { Tag } from './Tag'

export const ProjectCard = ({ project, size = 'medium' }) => {
  if (!project) return null

  // Transform github/netlify fields into actions array
  const actions = []
  if (project.github) {
    actions.push({
      label: 'GitHub',
      url: project.github,
      type: 'github',
      variant: 'secondary'
    })
  }
  if (project.netlify) {
    actions.push({
      label: 'Live Site',
      url: project.netlify,
      type: 'netlify',
      variant: 'primary'
    })
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
          <CategoryContainer>
            {project.categories &&
              project.categories.map((cat, index) => (
                <Tag variant='category' key={index} text={cat} />
              ))}
          </CategoryContainer>
          <TagContainer>
            {project.tags &&
              project.tags.map((tag, index) => <Tag key={index} text={tag} />)}
          </TagContainer>
          <StyledTitle>{project.title}</StyledTitle>
          <ReadMore text={project.description} maxLength={150} />
          <LinkContainer>
            <ButtonGroup actions={actions} />
          </LinkContainer>
        </TextContainer>
      </CardContent>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: auto;
  margin: 0 auto 2rem auto;
  box-sizing: border-box;
  padding: 0;
  height: 100%;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  background: var(--background-light);
  flex: 1;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
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
  padding: 0 20px;
  width: 50%;
  box-sizing: border-box;
  flex: 1;
`

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
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
  margin-top: auto;

  @media ${devices.tablet} {
    flex-direction: row;
    justify-content: flex-start;
  }
`
