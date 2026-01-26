import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import CaseStudyPage from './CaseStudyPage'
import { CaseInsight } from '../components/case study/CaseInsight'
import SectionContainer from '../components/SectionContainer'
import Meta from '../components/Meta'
import { Button } from '../components/Button'
import { fullBleed } from '../styles/spacing'
import {
  useProjectCaseStudy,
  useFormatProjectToCaseStudy
} from '../hooks/useCaseStudy'
import devices from '../styles/devices'

export default function ProjectCaseStudy() {
  const { projectId } = useParams()
  const project = useProjectCaseStudy(projectId)
  const caseStudyData = useFormatProjectToCaseStudy(project)

  if (!project || !caseStudyData) {
    return (
      <>
        <Meta
          title='Case Study Not Found | Linda Schönfeldt Portfolio'
          description='The requested case study could not be found.'
        />
        <PageContainer>
          <SectionContainer>
            <NotFound>Project case study not found.</NotFound>
          </SectionContainer>
        </PageContainer>
      </>
    )
  }

  return (
    <>
      <Meta
        title={`${project.title} - Case Study | Linda Schönfeldt Portfolio`}
        description={
          project.description ||
          project.fullDescription ||
          `Case study for ${project.title}`
        }
      />
      <PageContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SectionContainer>
          <CaseStudyPage {...caseStudyData} />

          {project.pdf && (
            <PDFDownloadSection>
              <Button
                label='📄 Download PDF'
                url={project.pdf}
                variant='primary'
              />
            </PDFDownloadSection>
          )}

          {project.challenges && (
            <CaseInsight>
              <strong>Key Challenge:</strong> {project.challenges}
            </CaseInsight>
          )}
        </SectionContainer>
      </PageContainer>
    </>
  )
}

const PageContainer = styled(motion.div)`
  ${fullBleed}
  background: var(--background-light);
  padding: 1rem;
  min-height: 100vh;

  @media ${devices.tablet} {
    padding: 2rem;
  }

  @media ${devices.laptop} {
    padding: 4rem;
  }
`

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: var(--text-main);
`

const PDFDownloadSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  padding: 2rem 0;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
`
