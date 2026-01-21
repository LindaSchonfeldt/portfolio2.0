import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import CaseStudyPage from './CaseStudyPage'
import { CaseInsight } from '../components/case study/CaseInsight'
import SectionContainer from '../components/SectionContainer'
import { fullBleed } from '../styles/spacing'
import {
  useProjectCaseStudy,
  useFormatProjectToCaseStudy
} from '../hooks/useCaseStudy'

export default function ProjectCaseStudy() {
  const { projectId } = useParams()
  const project = useProjectCaseStudy(projectId)
  const caseStudyData = useFormatProjectToCaseStudy(project)

  if (!project || !caseStudyData) {
    return (
      <PageContainer>
        <SectionContainer>
          <NotFound>Project case study not found.</NotFound>
        </SectionContainer>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionContainer>
        <CaseStudyPage {...caseStudyData} />

        {project.challenges && (
          <CaseInsight>
            <strong>Key Challenge:</strong> {project.challenges}
          </CaseInsight>
        )}
      </SectionContainer>
    </PageContainer>
  )
}

const PageContainer = styled(motion.div)`
  ${fullBleed}
  background: var(--background-light);
  padding: var(--section-padding);
  min-height: 100vh;
`

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: var(--text-main);
`
