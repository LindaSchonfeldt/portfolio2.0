import { Link } from 'react-router-dom'
import styled from 'styled-components'

import siteConfig from '../data/siteConfig.json'
import devices from '../styles/devices'
import { buttonBase } from '../styles/mixins'
import { getMediaPath } from '../utils/mediaPath'
import { getProjectActions } from '../utils/projectActions'
import { ButtonGroup } from './ButtonGroup'
import { ReadMore } from './ReadMore'
import ResponsiveImage from './ResponsiveImage'
import ResponsiveVideo from './ResponsiveVideo'
import { Tag } from './Tag'

const IMAGE_HEIGHTS = {
  small: { mobile: 140, tablet: 180, desktop: 240 },
  medium: { mobile: 160, tablet: 220, desktop: 300 },
  large: { mobile: 200, tablet: 280, desktop: 360 }
}

const getSizeStyles = ($size) => {
  if ($size === 'large') {
    return `
      @media ${devices.tablet} {
        grid-column: span 2;
      }
    `
  }

  return ''
}

export const ProjectCard = ({
  project,
  size = 'medium',
  fullRow,
  eager = false
}) => {
  if (!project) return null

  // Check if project is under construction
  const isUnderConstruction =
    project.hasDetail &&
    siteConfig.underConstruction.projectIds.includes(project.id)

  // Get actions array using helper
  const actions = getProjectActions(project, isUnderConstruction)

  // Generate media paths using helper
  // Default to tree.svg if no image is specified
  const imageName = project.image || 'tree'
  const imageExt = imageName === 'tree' ? '.svg' : '.png'
  const imagePath = getMediaPath(`${imageName}${imageExt}`)
  const videoWebm = project.video
    ? getMediaPath(`${project.video}.webm`, 'videos')
    : null
  const videoMp4 = project.video
    ? getMediaPath(`${project.video}.mp4`, 'videos')
    : null
  const videoPoster = project.videoPoster
    ? getMediaPath(`${project.videoPoster}.png`)
    : imagePath

  // Debug logging
  if (imagePath) {
    console.log(`[${project.title}] Image path:`, imagePath)
    console.log(
      `[${project.title}] WebP path:`,
      imagePath.replace(/\.png$/, '.webp')
    )
  }

  // Determine whether to show video or image
  const hasVideo = project.video && (videoWebm || videoMp4)

  // Calculate sizes attribute based on card size for responsive images
  // Tell browser the actual rendered width so it picks the right image variant
  const imageSizes =
    size === 'large'
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px'
      : size === 'small'
        ? '(max-width: 640px) 100vw, (max-width: 1024px) 400px, 400px'
        : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px'

  // Render media content
  const mediaContent = (
    <ImageContainer>
      {isUnderConstruction && (
        <UnderConstructionBanner>
          <BannerText>🚧 Under Construction</BannerText>
        </UnderConstructionBanner>
      )}
      <MediaWrapper>
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
            eager={eager}
          />
        ) : imagePath ? (
          imagePath.endsWith('.svg') ? (
            <StyledImage
              src={imagePath}
              alt={project.alt || `${project.title} project screenshot`}
            />
          ) : (
            <ResponsiveImage
              webpSrc={imagePath.replace(/\.png$/, '.webp')}
              fallbackSrc={imagePath}
              alt={project.alt || `${project.title} project screenshot`}
              className='project-image'
              sizes={imageSizes}
              eager={eager}
            />
          )
        ) : (
          <StyledImage
            src={new URL('../assets/tree.svg', import.meta.url).href}
            alt='Placeholder'
          />
        )}
      </MediaWrapper>
    </ImageContainer>
  )

  return (
    <CardContainer $size={size} $fullRow={fullRow}>
      <CardContent $size={size}>
        <ImageWrapper $size={size}>{mediaContent}</ImageWrapper>

        <TextContainer $size={size}>
          <ContentWrapper>
            <CategoryContainer>
              {project.hasDetail && (
                <CaseStudyBadge>📚 Case Study</CaseStudyBadge>
              )}
              {project.categories &&
                project.categories.map((cat, index) => (
                  <Tag variant='category' key={index} text={cat} />
                ))}
            </CategoryContainer>
            <StyledTitle>{project.title}</StyledTitle>
            <StyledReadMore
              text={project.description}
              maxHeight={
                size === 'large' ? '6em' : size === 'medium' ? '4.5em' : '6.5em'
              }
            />
            <StackContainer>
              {project.stack &&
                project.stack.map((tag, index) => (
                  <Tag key={index} text={tag} />
                ))}
            </StackContainer>
          </ContentWrapper>
          <LinkContainer $size={size}>
            <ButtonGroup actions={actions} />
            {project.hasDetail && (
              <CaseStudyButton
                as={isUnderConstruction ? 'button' : Link}
                to={
                  isUnderConstruction
                    ? undefined
                    : `/projects/${project.slug || project.id}`
                }
                $disabled={isUnderConstruction}
                onClick={
                  isUnderConstruction ? (e) => e.preventDefault() : undefined
                }
              >
                Case Study
              </CaseStudyButton>
            )}
          </LinkContainer>
        </TextContainer>
      </CardContent>
    </CardContainer>
  )
}

const CardContainer = styled.article`
  ${({ $size }) => {
    const { mobile, tablet, desktop } =
      IMAGE_HEIGHTS[$size] || IMAGE_HEIGHTS.medium
    return `
      --media-height-mobile: ${mobile}px;
      --media-height-tablet: ${tablet}px;
      --media-height-desktop: ${desktop}px;
    `
  }}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  height: auto;
  margin: 0 auto 0.5rem auto;
  box-sizing: border-box;
  padding: 0;
  width: 100%;

  @media ${devices.tablet} {
    margin: 0 auto 2rem auto;
    align-items: stretch;
    min-height: ${({ $size }) => {
      if ($size === 'small') return '380px'
      if ($size === 'medium') return '500px'
      return 'auto'
    }};
  }

  ${({ $size }) => getSizeStyles($size)}
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
    flex-direction: ${({ $size }) => ($size === 'medium' ? 'column' : 'row')};
    margin-bottom: ${({ $size }) => ($size === 'large' ? '20px' : '0')};
    column-gap: 1.5rem;
    min-height: ${({ $size }) => {
      if ($size === 'small') return '380px'
      if ($size === 'medium') return '500px'
      return 'auto'
    }};
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const UnderConstructionBanner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-15deg);
  z-index: 10;
  background: rgba(255, 179, 71, 0.95);
  padding: 0.75rem 2rem;
  border: 3px solid var(--text-dark);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none;

  @media ${devices.tablet} {
    padding: 1rem 3rem;
  }
`

const BannerText = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-dark);
  white-space: nowrap;

  @media ${devices.tablet} {
    font-size: 1.25rem;
  }
`

const MediaWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

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

const ImageWrapper = styled.div`
  display: block;
  width: 100%;
  height: ${({ $size }) =>
    $size === 'small' ? '140px' : 'var(--media-height-mobile, 160px)'};
  position: relative;
  cursor: default;

  @media ${devices.tablet} {
    height: ${({ $size }) => {
      if ($size === 'large') return 'auto'
      if ($size === 'small') return '380px'
      return 'var(--media-height-tablet, 220px)'
    }};
    flex: ${({ $size }) => {
      if ($size === 'large') return '0 0 50%'
      if ($size === 'small') return '0 0 180px'
      return '1 1 auto'
    }};
    align-self: ${({ $size }) => ($size === 'large' ? 'stretch' : 'auto')};
  }

  @media ${devices.laptop} {
    height: ${({ $size }) => {
      if ($size === 'large') return 'auto'
      if ($size === 'small') return '380px'
      return 'var(--media-height-desktop, 300px)'
    }};
    flex: ${({ $size }) => {
      if ($size === 'large') return '0 0 50%'
      if ($size === 'small') return '0 0 240px'
      return '1 1 auto'
    }};
    min-height: ${({ $size }) => {
      if ($size === 'large') return 'auto'
      if ($size === 'small') return '380px'
      return 'var(--media-height-desktop, 300px)'
    }};
    align-self: ${({ $size }) => ($size === 'large' ? 'stretch' : 'auto')};
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 0.5rem;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  flex: 1 1 auto;
  min-height: 0;
  gap: 0.75rem;
  box-sizing: border-box;

  @media ${devices.tablet} {
    padding: 0;
    flex: ${({ $size }) => ($size === 'large' ? '1 1 auto' : '1 1 auto')};
    min-height: 0;
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
  gap: 0.5rem;
  width: 100%;
  padding-top: 0.5rem;
  margin-top: auto;

  @media ${devices.tablet} {
    flex-direction: row;
    margin-top: auto;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`

const CaseStudyBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.75rem;
  background: var(--primary-green-dark);
  color: var(--text-light);
  font-family: 'Raleway', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const CaseStudyButton = styled(Link)`
  ${buttonBase}
  min-width: 120px;
  margin-bottom: 0.5rem;
  width: 100%;
  background-color: var(--primary-green-dark);
  color: var(--text-light);
  border-color: var(--primary-green-dark);
  white-space: nowrap;

  &:hover {
    background-color: var(--primary-green);
    opacity: 0.9;
  }

  @media ${devices.tablet} {
    margin-bottom: 0;
    width: 100%;
  }

  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    `
      background-color: #e0e0e0;
      color: #9e9e9e;
      border-color: #bdbdbd;
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;

      &:hover {
        background-color: #e0e0e0;
        color: #9e9e9e;
        opacity: 0.6;
      }
    `}
`
