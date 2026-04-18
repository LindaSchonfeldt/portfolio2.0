import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styled from 'styled-components'

import skillsData from '../data/content.json'
import { fullBleed } from '../styles/spacing'

export const Skills = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <StyledSkillsSection id='skills' ref={sectionRef}>
      <ContentContainer
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2>Skills</h2>
        <SkillList>
          {skillsData.skills.map((skillGroup) => (
            <SkillRow key={skillGroup.category}>
              <Category>{skillGroup.category}</Category>
              <TagList>
                {skillGroup.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </TagList>
            </SkillRow>
          ))}
        </SkillList>
      </ContentContainer>
    </StyledSkillsSection>
  )
}

const StyledSkillsSection = styled.section`
  ${fullBleed}
  background-color: var(--background-green);
  box-sizing: border-box;
  padding: var(--section-padding);
`

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SkillRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2rem;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(44, 62, 47, 0.2);

  &:first-child {
    border-top: 1px solid rgba(44, 62, 47, 0.2);
  }
`

const Category = styled.h3`
  color: var(--primary-green-dark);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  min-width: 6rem;
  margin: 0;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
`

const Tag = styled.span`
  color: var(--primary-green-dark);
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
`
