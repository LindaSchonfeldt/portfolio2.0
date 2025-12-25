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
 * Horizontal Card Layout
 * Wide cards with icon on left, skills flowing to the right
 */
export const SkillSectionHorizontalCards = () => {
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
          <div className='cardsContainer'>
            {skillsData.skills.map((skillGroup, index) => {
              const IconComponent = iconMap[skillGroup.category]
              return (
                <motion.div
                  className='horizontalCard'
                  key={skillGroup.category}
                  initial={{ opacity: 0, x: -60 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {IconComponent && (
                    <motion.div
                      className='iconContainer'
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    >
                      <IconComponent size={28} />
                    </motion.div>
                  )}
                  <div className='cardContent'>
                    <h3>{skillGroup.category}</h3>
                    <div className='skillTags'>
                      {skillGroup.items.map((item, itemIndex) => (
                        <motion.span
                          key={item}
                          className='tag'
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
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

  .cardsContainer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 100%;

    @media ${devices.tablet} {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @media ${devices.laptop} {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    @media ${devices.desktop} {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  .horizontalCard {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;

    @media ${devices.tablet} {
      padding: 1.75rem;
    }

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 0.9);

      .iconContainer {
        transform: scale(1.15) rotate(5deg);
        background: var(--accent-orange);
      }

      .tag {
        transform: translateY(-2px);
      }
    }

    .iconContainer {
      flex-shrink: 0;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--primary-green-dark);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;

      @media ${devices.tablet} {
        width: 64px;
        height: 64px;
      }
    }

    .cardContent {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      align-items: center;
    }

    h3 {
      color: var(--primary-green-dark);
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      text-align: center;

      @media ${devices.tablet} {
        font-size: 1.35rem;
      }
    }

    .skillTags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      justify-content: center;
    }

    .tag {
      background: var(--primary-green);
      color: var(--primary-green-dark);
      padding: 0.45rem 0.9rem;
      border-radius: 24px;
      font-size: 0.85rem;
      font-family: 'Raleway', sans-serif;
      font-weight: 500;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      @media ${devices.tablet} {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
      }

      &:hover {
        background: var(--primary-green-dark);
        color: white;
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
    }
  }
`

export default SkillSectionHorizontalCards
