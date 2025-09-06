import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styled from 'styled-components'

import SectionContainer from '../components/SectionContainer'

export const Experience = () => {
  // Create a ref for the section
  const sectionRef = useRef(null)

  // Check if section is in view (with some margin to trigger slightly before it's fully visible)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <SectionContainer id='experience' ref={sectionRef}>
      <ExperienceContent
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2>Experience</h2>
        <p>
          I've worked on various projects ranging from web development to UX
          design. My journey has equipped me with a diverse skill set and a
          passion for creating user-centric solutions.
        </p>
      </ExperienceContent>
    </SectionContainer>
  )
}

const ExperienceContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
`
