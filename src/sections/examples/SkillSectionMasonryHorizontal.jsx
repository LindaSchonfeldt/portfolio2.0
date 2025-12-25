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
 * Masonry Grid with Horizontal Skill Tags
 * Skills flow horizontally like badges, cards have dynamic heights
 */
export const SkillSectionMasonryHorizontal = () => {
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
          <div className='masonryContainer'>
            {skillsData.skills.map((skillGroup, index) => {
              const IconComponent = iconMap[skillGroup.category]
              return (
                <motion.div
                  className='masonryCard'
                  key={skillGroup.category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {IconComponent && (
                    <motion.div
                      className='categoryIcon'
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    >
                      <IconComponent size={20} />
                    </motion.div>
                  )}
                  <h3>{skillGroup.category}</h3>
                  <div className='skillTags'>
                    {skillGroup.items.map((item) => (
                      <span key={item} className='tag'>{item}</span>
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
  text-align: center;
  width: 100%;

  h2 {
    color: var(--primary-green-dark);
    margin-bottom: 3rem;
  }

  .masonryContainer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 100%;

    @media ${devices.tablet} {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    @media ${devices.laptop} {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
  }

  .masonryCard {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 16px;
    padding: 2rem 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 0.95);

      .categoryIcon {
        transform: scale(1.15) rotate(10deg);
        background: var(--accent-orange);
      }

      .tag {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .categoryIcon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--primary-green-dark);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-bottom: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
    }

    h3 {
      color: var(--primary-green-dark);
      margin: 0 0 1.5rem 0;
      font-size: 1.35rem;
      font-weight: 600;
    }

    .skillTags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
      width: 100%;
    }

    .tag {
      background: var(--primary-green);
      color: var(--primary-green-dark);
      padding: 0.5rem 1rem;
      border-radius: 24px;
      font-size: 0.9rem;
      font-family: 'Raleway', sans-serif;
      font-weight: 500;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      &:hover {
        background: var(--primary-green-dark);
        color: white;
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
    }
  }
`

export default SkillSectionMasonryHorizontal
