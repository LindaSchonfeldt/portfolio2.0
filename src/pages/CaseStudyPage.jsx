import styled from 'styled-components'
import { CaseHero } from '../components/case study/CaseHero'
import { CaseSection } from '../components/case study/CaseSection'

export default function CaseStudyPage({
  title,
  subtitle,
  role,
  client,
  timeline,
  tools,
  heroImage,
  heroAlt,
  sections
}) {
  return (
    <StyledArticle>
      <CaseHero
        title={title}
        subtitle={subtitle}
        role={role}
        client={client}
        timeline={timeline}
        tools={tools}
        heroImage={heroImage}
        heroAlt={heroAlt}
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
