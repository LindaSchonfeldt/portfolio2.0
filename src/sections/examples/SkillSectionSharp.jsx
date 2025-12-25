import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styled from 'styled-components'
import { FaCode, FaPalette, FaToolbox, FaPlus, FaRocket } from 'react-icons/fa'

import skillsData from '../../data/content.json'
import devices from '../../styles/devices'
import { fullBleed } from '../../styles/spacing'

// Icon mapping for categories
const iconMap = {
  Code: FaCode,
  Design: FaPalette,
  Toolbox: FaToolbox,
  More: FaPlus,
  Upcoming: FaRocket
}

/**
 * Sharp, Clean Design - Inspired by Projects page
 * No rounded corners, black rectangular tags, minimal shadows
 */
export const SkillSectionSharp = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <StyledSkillsSection id='skills' ref={sectionRef}>
      <ContentContainer>
        <SkillsContent>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Skills
          </motion.h2>
          <div className='gridContainer'>
            {skillsData.skills.map((skillGroup, index) => {
              const IconComponent = iconMap[skillGroup.category]
              return (
                <motion.div
                  className='skillCard'
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className='cardHeader'>
                    {IconComponent && (
                      <motion.div
                        className='iconBox'
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        <IconComponent size={24} />
                      </motion.div>
                    )}
                    <h3>{skillGroup.category}</h3>
                  </div>
                  <div className='skillTags'>
                    {skillGroup.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        className='tag'
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.03 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
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

const SkillsContent = styled.div`
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
    padding: 2rem;
    transition: all 0.2s ease;
    border: 1px solid transparent;

    &:hover {
      border-color: var(--primary-green-dark);
      transform: translateY(-4px);

      .iconBox {
        background: var(--accent-orange);
        color: white;
      }

      .tag {
        transform: translateY(-1px);
      }
    }

    .cardHeader {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--primary-green-dark);
    }

    .iconBox {
      width: 48px;
      height: 48px;
      background: var(--primary-green-dark);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    h3 {
      color: var(--primary-green-dark);
      margin: 0;
      font-size: 1.35rem;
      font-weight: 600;
      flex: 1;
    }

    .skillTags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
    }

    .tag {
      display: inline-block;
      background-color: black;
      color: var(--text-light);
      font-size: 0.8rem;
      font-weight: 500;
      font-family: 'Raleway', sans-serif;
      padding: 0.2rem 0.3rem;
      margin-bottom: 0.2rem;
      transition: all 0.15s ease;

      &:hover {
        background-color: var(--primary-green-dark);
        transform: translateY(-1px);
      }
    }
  }
`

export default SkillSectionSharp
