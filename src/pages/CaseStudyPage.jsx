import styled from 'styled-components'
import { CaseHero } from '../components/case study/CaseHero'
import { CaseSection } from '../components/case study/CaseSection'

export default function CaseStudyPage({
  title,
  subtitle,
  role,
  timeline,
  tools,
  heroImage,
  sections
}) {
  return (
    <StyledArticle>
      <CaseHero
        title={title}
        subtitle={subtitle}
        role={role}
        timeline={timeline}
        tools={tools}
        heroImage={heroImage}
      />

      {sections.map((section, index) => (
        <CaseSection key={index} {...section} />
      ))}
    </StyledArticle>
  )
}

const StyledArticle = styled.article`
  max-width: 900px;
  margin: 0 auto;
  padding: 0px;
`
