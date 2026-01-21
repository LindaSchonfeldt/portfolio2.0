import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaPalette, FaPlus, FaRocket, FaToolbox } from 'react-icons/fa'
import styled from 'styled-components'

import skillsData from '../data/content.json'
import devices from '../styles/devices'
import { fullBleed } from '../styles/spacing'

// Icon mapping for skill categories
const iconMap = {
  Code: FaCode,
  Design: FaPalette,
  Toolbox: FaToolbox,
  More: FaPlus,
  Upcoming: FaRocket
}

export const SkillSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <StyledSkillsSection id='skills' ref={sectionRef}>
      <ContentContainer>
        <SkillsContent
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2>Skills</h2>
          <div className='gridContainer'>
            {skillsData.skills.map((skillGroup) => {
              const IconComponent = iconMap[skillGroup.category]
              return (
                <div className='skillCard' key={skillGroup.category}>
                  <div className='cardHeader'>
                    <h3>{skillGroup.category}</h3>
                  </div>
                  <div className='skillTags'>
                    {skillGroup.items.map((item) => (
                      <span key={item} className='tag'>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </SkillsContent>
      </ContentContainer>
    </StyledSkillsSection>
  )
}

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

const SkillsContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h2 {
    color: var(--primary-green-dark);
    margin-bottom: 3rem;
    text-align: center;
  }

  .gridContainer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    width: 100%;

    @media ${devices.tablet} {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    @media ${devices.laptop} {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }

    @media ${devices.desktop} {
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
    }
  }

  .skillCard {
    background: var(--background-light);
    padding: 0;
    transition: all 0.2s ease;
    border-radius: 4px;
    }

    .cardHeader {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding: 1.5rem 2rem;
      margin-bottom: 0;
      background: var(--primary-green-dark);
    }

    h3 {
      color: white;
      margin: 0;
      font-size: 1.35rem;
      font-weight: 600;
      flex: 1;
    }

    .skillTags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
      padding: 2rem 2rem;
    }

    .tag {
      display: inline-block;
      color: var(--text-dark);
      font-size: 1rem;
      font-weight: 500;
      font-family: 'Raleway', sans-serif;
      padding: 0.2rem 0.3rem;
      margin-bottom: 0.2rem;
      transition: all 0.15s ease;
    }
    }
  }
`
