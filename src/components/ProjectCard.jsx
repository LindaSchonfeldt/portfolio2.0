import styled from 'styled-components'

import devices from '../styles/devices'
import { ButtonGroup } from './ButtonGroup'
import { ReadMore } from './ReadMore'
import ResponsiveImage from './ResponsiveImage'
import ResponsiveVideo from './ResponsiveVideo'
import { Tag } from './Tag'
import { getMediaPath } from '../utils/mediaPath'
import { getProjectActions } from '../utils/projectActions'

export const ProjectCard = ({ project, size = 'medium', fullRow }) => {
  if (!project) return null

  // Get actions array using helper
  const actions = getProjectActions(project)

  // Generate media paths using helper
  const imagePath = project.image ? getMediaPath(`${project.image}.png`) : null
  const videoWebm = project.video
    ? getMediaPath(`${project.video}.webm`, 'videos')
    : null
  const videoMp4 = project.video
    ? getMediaPath(`${project.video}.mp4`, 'videos')
    : null
  const videoPoster = project.videoPoster
    ? getMediaPath(`${project.videoPoster}.png`)
    : imagePath

  // Determine whether to show video or image
  const hasVideo = project.video && (videoWebm || videoMp4)

  return (
    <CardContainer size={size} $fullRow={fullRow}>
      <CardContent>
        <ImageContainer>
          {hasVideo ? (
            <ResponsiveVideo
              webmSrc={videoWebm}
              mp4Src={videoMp4}
              posterSrc={videoPoster}
              className='project-video'
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
            />
          ) : imagePath ? (
            <ResponsiveImage
              webpSrc={imagePath.replace(/\.png$/, '.webp')}
              fallbackSrc={imagePath}
              alt={project.alt || `${project.title} project screenshot`}
              className='project-image'
            />
          ) : (
            <StyledImage
              src={new URL('../assets/tree.svg', import.meta.url).href}
              alt='Placeholder'
            />
          )}
        </ImageContainer>
        <TextContainer>
          <CategoryContainer>
            {project.categories &&
              project.categories.map((cat, index) => (
                <Tag variant='category' key={index} text={cat} />
              ))}
          </CategoryContainer>
          <StyledTitle>{project.title}</StyledTitle>
          <StyledReadMore text={project.description} maxLength={150} />
          <LinkContainer>
            <ButtonGroup actions={actions} />
          </LinkContainer>
          <StackContainer>
            {project.stack &&
              project.stack.map((tag, index) => <Tag key={index} text={tag} />)}
          </StackContainer>
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
  height: 100%;
  margin: 0 auto 0.5rem auto;
  box-sizing: border-box;
  padding: 0;

  @media ${devices.tablet} {
    margin: 0 auto 2rem auto;
  }

  ${({ $fullRow }) => $fullRow && 'grid-column: 1 / -1;'}
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  background: var(--background-light);
  flex: 1;

  @media ${devices.tablet} {
    flex-direction: row;
    margin-bottom: 20px;
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;

  @media ${devices.tablet} {
    flex: 1;
    height: 100%;
    min-height: 250px;
  }

  /* Style for ResponsiveImage */
  .project-image,
  .project-image img,
  .project-image picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Scale up to crop out padding from image */
  .project-image img {
    transform: scale(1.15);
  }

  /* Style for ResponsiveVideo */
  .project-video,
  .project-video video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: transparent;
  background-color: #ffb347;
  display: block;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px 0;
  flex: 1;
  box-sizing: border-box;

  @media ${devices.tablet} {
    padding: 0 20px;
    height: 100%;
  }
`

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`

const StackContainer = styled.div`
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

const StyledReadMore = styled(ReadMore)`
  margin-bottom: 1.5rem;
  display: block;

  @media ${devices.tablet} {
    margin-bottom: 1rem;
  }
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
