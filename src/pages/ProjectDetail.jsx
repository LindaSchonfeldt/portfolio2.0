import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import Meta from '../components/Meta'
import SectionContainer from '../components/SectionContainer'
import projectsData from '../data/projects.json'
import devices from '../styles/devices'

const MotionDiv = motion.div

const ProjectDetail = () => {
  const { projectId } = useParams()
  const project = projectsData.projects.find((p) => p.slug === projectId)
  const prototypeEmbedUrl = (() => {
    if (!project?.prototype) return null
    const url = project.prototype

    if (url.includes('embed.figma.com') || url.includes('figma.com/embed')) {
      return url
    }

    if (url.includes('figma.com')) {
      return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
    }

    return url
  })()

  if (!project) {
    return (
      <SectionContainer>
        <h1>Project not found</h1>
        <Link to='/projects'>← Back to Projects</Link>
      </SectionContainer>
    )
  }

  // Redirect if project doesn't have detail page
  if (!project.hasDetail) {
    return (
      <SectionContainer>
        <h1>This project doesn't have a detail page yet</h1>
        <Link to='/projects'>← Back to Projects</Link>
      </SectionContainer>
    )
  }

  return (
    <>
      <Meta
        title={`${project.title} | Linda Schönfeldt Portfolio`}
        description={project.fullDescription || project.description}
      />

      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <SectionContainer>
          <BackLink to='/projects'>
            <IoIosArrowBack /> Back to Projects
          </BackLink>

          <ProjectHero>
            <ProjectTitle>{project.title}</ProjectTitle>
            {(project.category || project.date) && (
              <ProjectMeta>
                {project.category && <span>{project.category}</span>}
                {project.category && project.date && <span>•</span>}
                {project.date && <span>{project.date}</span>}
              </ProjectMeta>
            )}

            <ProjectLinks>
              {project.github && (
                <ProjectLink
                  href={project.github}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FiGithub /> View Code
                </ProjectLink>
              )}
              {project.netlify && (
                <ProjectLink
                  href={project.netlify}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FiExternalLink /> Live Demo
                </ProjectLink>
              )}
              {project.prototype && (
                <ProjectLink
                  href={project.prototype}
                  target='_blank'
                  rel='noopener noreferrer'
                  $secondary
                >
                  <FiExternalLink /> Prototype
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectHero>

          {project.image && (
            <HeroImage src={project.image} alt={project.title} />
          )}

          {prototypeEmbedUrl && (
            <PrototypeEmbed>
              <PrototypeHeader>Prototype</PrototypeHeader>
              <PrototypeFrame
                title={`${project.title} prototype`}
                src={prototypeEmbedUrl}
                allow='clipboard-write; fullscreen'
                allowFullScreen
                loading='lazy'
              />
            </PrototypeEmbed>
          )}

          <ContentGrid>
            <MainContent>
              {/* Mobile/Tablet: Show Role and Client before Overview */}
              <MobileMetaSection>
                {project.role && (
                  <MetaCard>
                    <h3>Role</h3>
                    <p>{project.role}</p>
                  </MetaCard>
                )}

                {project.client && (
                  <MetaCard>
                    <h3>Client</h3>
                    <p>{project.client}</p>
                  </MetaCard>
                )}
              </MobileMetaSection>

              {project.fullDescription && (
                <Section>
                  <h2>Overview</h2>
                  <p>{project.fullDescription}</p>
                </Section>
              )}

              {project.challenges && (
                <Section>
                  <h2>Challenge</h2>
                  <p>{project.challenges}</p>
                </Section>
              )}

              {project.solution && (
                <Section>
                  <h2>Solution</h2>
                  <p>{project.solution}</p>
                </Section>
              )}

              {project.outcome && (
                <Section>
                  <h2>Outcome</h2>
                  <p>{project.outcome}</p>
                </Section>
              )}

              {project.images && project.images.length > 0 && (
                <Section>
                  <h2>Gallery</h2>
                  <ImageGallery>
                    {project.images.map((img, idx) => (
                      <GalleryImage
                        key={idx}
                        src={img}
                        alt={`${project.title} ${idx + 1}`}
                      />
                    ))}
                  </ImageGallery>
                </Section>
              )}
            </MainContent>

            <Sidebar>
              {project.stack && project.stack.length > 0 && (
                <SidebarSection>
                  <h3>Technologies</h3>
                  <TechList>
                    {project.stack.map((tech, idx) => (
                      <TechTag key={idx}>{tech}</TechTag>
                    ))}
                  </TechList>
                </SidebarSection>
              )}

              {project.role && (
                <SidebarSection>
                  <h3>Role</h3>
                  <p>{project.role}</p>
                </SidebarSection>
              )}

              {project.client && (
                <SidebarSection>
                  <h3>Client</h3>
                  <p>{project.client}</p>
                </SidebarSection>
              )}
            </Sidebar>
          </ContentGrid>
        </SectionContainer>
      </MotionDiv>
    </>
  )
}

export default ProjectDetail

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-green-dark);
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: var(--accent-orange);
  }
`

const ProjectHero = styled.div`
  margin-bottom: 3rem;
`

const ProjectTitle = styled.h1`
  margin-bottom: 1rem;
`

const ProjectMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`

const ProjectLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ $secondary }) =>
    $secondary ? '#ffffff' : 'var(--primary-green-dark)'};
  color: ${({ $secondary }) =>
    $secondary ? 'var(--primary-green-dark)' : '#ffffff'};
  border: 2px solid
    ${({ $secondary }) =>
      $secondary ? 'var(--primary-green-dark)' : 'transparent'};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: ${({ $secondary }) =>
      $secondary ? 'var(--primary-green-dark)' : 'var(--accent-orange)'};
    color: white;
  }
`

const HeroImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 3rem;
`

const PrototypeEmbed = styled.div`
  margin: 2rem 0 3rem;
  border-radius: 12px;
  overflow: hidden;
  background: var(--background-light);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
`

const PrototypeHeader = styled.div`
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: var(--primary-green-dark);
`

const PrototypeFrame = styled.iframe`
  width: 100%;
  height: clamp(420px, 65vw, 860px);
  border: 0;
  background: #0f172a;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media ${devices.laptop} {
    grid-template-columns: 2fr 1fr;
  }
`

const MainContent = styled.div``

const MobileMetaSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${devices.laptop} {
    display: none;
  }
`

const MetaCard = styled.div`
  background: var(--background-light);
  border-radius: 8px;

  h3 {
    margin-bottom: 0.5rem;
    color: var(--primary-green-dark);
    font-size: 1.5rem;
  }

  p {
    color: var(--text-secondary);
    margin: 0;
  }
`

const Section = styled.section`
  margin-bottom: 3rem;

  h2 {
    margin-bottom: 1rem;
    color: var(--primary-green-dark);
  }

  p {
    line-height: 1.8;
    color: var(--text-secondary);
  }
`

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`

const GalleryImage = styled.img`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`

const Sidebar = styled.aside`
  display: none;

  @media ${devices.laptop} {
    display: block;
  }
`

const SidebarSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--background-light);
  border-radius: 8px;

  h3 {
    margin-bottom: 1rem;
    color: var(--primary-green-dark);
  }

  p {
    color: var(--text-secondary);
  }
`

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const TechTag = styled.span`
  padding: 0.5rem 1rem;
  background: var(--primary-green-dark);
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
`
