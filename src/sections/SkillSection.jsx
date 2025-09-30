import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styled from 'styled-components'

import devices from '../styles/devices'
import { fullBleed } from '../styles/spacing'
import skillsData from '../data/content.json'

export const SkillSection = () => {
  // Create a ref for the section
  const sectionRef = useRef(null)

  // Check if section is in view (with some margin to trigger slightly before it's fully visible)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <StyledSkillsSection id='skills' ref={sectionRef}>
      <ContentContainer>
        <MotionSkillsContent
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          as={SkillStyles}
        >
          <SkillStyles>
            <h2>Skills</h2>
            <div className='skillContainer'>
              {skillsData.skills.map((skillGroup) => (
                <div
                  className={`skillList ${skillGroup.category.toLowerCase()}`}
                  key={skillGroup.category}
                >
                  <h3>{skillGroup.category}</h3>
                  <ul>
                    {skillGroup.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SkillStyles>
        </MotionSkillsContent>
      </ContentContainer>
    </StyledSkillsSection>
  )
}

// Create a styled version of SectionContainer
const StyledSkillsSection = styled.section`
  ${fullBleed}
  background-color: var(--background-green);
  box-sizing: border-box;
  padding: var(--section-padding);

  @media ${devices.laptop} {
    padding: var(--section-padding);
  }
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media ${devices.laptop} {
    max-width: 1200px;
  }

  @media ${devices.desktop} {
    max-width: 1400px;
  }
`

// Style the inner content
const SkillStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;

  h2 {
    color: var(--primary-green-dark);
  }

  .skillList {
    padding: 0;
    margin: var(--gap-sm) 0;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .skillList ul {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 1; /* Allow list to fill available space */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .skillList li {
    font-family: 'Raleway', sans-serif;
    margin-bottom: 0.75rem;
  }

  h3 {
    margin-bottom: var(--gap-sm);
    color: var(--primary-green-dark);
  }

  /* Mobile spacing between sections (without dividers) */
  .skillList:not(:last-child) {
    margin-bottom: var(--gap-sm);
  }

  /* Container for all skill lists */
  .skillContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  /* Tablet layout */
  @media ${devices.tablet} {
    .skillContainer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 
        "code design"
        "toolbox more"
        "upcoming .";
      gap: var(--gap-sm);
      justify-content: center;
      align-items: stretch;
    }

    .skillList {
      padding: 1rem;
      margin: 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 200px;
    }

    /* Target skill sections by their class names */
    .skillList.code {
      grid-area: code;
    }

    .skillList.design {
      grid-area: design;
    }

    .skillList.toolbox {
      grid-area: toolbox;
    }

    .skillList.more {
      grid-area: more;
    }

    .skillList.upcoming {
      grid-area: upcoming;
    }

    .divider {
      display: none; /* Hide dividers on tablet */
    }
  }

  /* Desktop layout */
  @media ${devices.laptop} {
    .skillContainer {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-template-areas: "code design toolbox more upcoming";
      gap: 2.5rem;
      justify-content: space-between;
      align-items: stretch; /* Make all columns equal height */
    }

    .skillList {
      padding: 1.5rem 0.5rem;
      margin: 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      min-height: 300px;
      position: relative;
    }

    .skillList h3 {
      margin-top: 0;
    }

    .skillList ul {
      list-style: none;
      padding: 0;
      margin: 0;
      flex-grow: 1; /* Allow list to fill available space */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }
  }
`

// Motion component for animating the skill section content
const MotionSkillsContent = motion(SkillStyles)
