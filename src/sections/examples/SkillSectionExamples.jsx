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

// ============================================================================
// EXAMPLE 1: Timeline Layout (Similar to Experience Section)
// ============================================================================

export const SkillSectionTimeline = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <StyledSkillsSection id='skills' ref={sectionRef}>
      <ContentContainer>
        <MotionTimelineContent
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2>Skills</h2>
          <div className='timelineContainer'>
            {skillsData.skills.map((skillGroup, index) => {
              const IconComponent = iconMap[skillGroup.category]
              return (
                <motion.div
                  className='timelineItem'
                  key={skillGroup.category}
                  initial={{ opacity: 0, x: -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <motion.div
                    className='iconCircle'
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                  >
                    {IconComponent && <IconComponent size={20} />}
                  </motion.div>
                  <div className='content'>
                    <h3>{skillGroup.category}</h3>
                    <div className='skillTags'>
                      {skillGroup.items.map((item) => (
                        <span key={item} className='tag'>{item}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </MotionTimelineContent>
      </ContentContainer>
    </StyledSkillsSection>
  )
}

// ============================================================================
// EXAMPLE 2: Masonry/Bento Grid Layout
// ============================================================================

export const SkillSectionMasonry = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <StyledSkillsSection id='skills' ref={sectionRef}>
      <ContentContainer>
        <MotionMasonryContent
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2>Skills</h2>
          <div className='masonryContainer'>
            {skillsData.skills.map((skillGroup, index) => (
              <motion.div
                className='masonryItem'
                key={skillGroup.category}
                style={{ '--row-span': Math.ceil(skillGroup.items.length / 2) + 2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{skillGroup.category}</h3>
                <ul>
                  {skillGroup.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </MotionMasonryContent>
      </ContentContainer>
    </StyledSkillsSection>
  )
}

// ============================================================================
// EXAMPLE 3: Horizontal Carousel Layout
// ============================================================================

export const SkillSectionCarousel = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <StyledSkillsSection id='skills' ref={sectionRef}>
      <ContentContainer>
        <MotionCarouselContent
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2>Skills</h2>
          <div className='carouselContainer'>
            {skillsData.skills.map((skillGroup, index) => (
              <motion.div
                className='carouselCard'
                key={skillGroup.category}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{skillGroup.category}</h3>
                <ul>
                  {skillGroup.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </MotionCarouselContent>
      </ContentContainer>
    </StyledSkillsSection>
  )
}

// ============================================================================
// STYLED COMPONENTS - Shared
// ============================================================================

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

const BaseStyles = `
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;

  h2 {
    color: var(--primary-green-dark);
    margin-bottom: 3rem;
  }
`

// ============================================================================
// Timeline Styles
// ============================================================================

const TimelineStyles = styled.div`
  ${BaseStyles}

  .timelineContainer {
    position: relative;
    width: 100%;
    max-width: 800px;
    padding: 0 1rem;

    &::before {
      content: '';
      position: absolute;
      left: 20px;
      top: 0;
      height: 100%;
      width: 3px;
      background: var(--primary-green-dark);
      opacity: 0.3;

      @media ${devices.tablet} {
        left: 30px;
      }
    }
  }

  .timelineItem {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 3rem;
    position: relative;
    text-align: left;

    @media ${devices.tablet} {
      gap: 2rem;
    }
  }

  .iconCircle {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--primary-green-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    @media ${devices.tablet} {
      width: 60px;
      height: 60px;
    }

    svg {
      @media ${devices.tablet} {
        width: 24px;
        height: 24px;
      }
    }
  }

  .content {
    flex: 1;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateX(8px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
  }

  h3 {
    color: var(--primary-green-dark);
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
  }

  .skillTags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    background: var(--primary-green);
    color: var(--primary-green-dark);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-family: 'Raleway', sans-serif;
    transition: all 0.2s ease;

    &:hover {
      background: var(--primary-green-dark);
      color: white;
      transform: scale(1.05);
    }
  }
`

const MotionTimelineContent = motion(TimelineStyles)

// ============================================================================
// Masonry Styles
// ============================================================================

const MasonryStyles = styled.div`
  ${BaseStyles}

  .masonryContainer {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 50px;
    gap: 1rem;
    width: 100%;

    @media ${devices.tablet} {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @media ${devices.laptop} {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  .masonryItem {
    grid-row: span var(--row-span);
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    padding: 2rem 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 0.95);
    }

    h3 {
      color: var(--primary-green-dark);
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
      border-bottom: 2px solid var(--accent-orange);
      padding-bottom: 0.5rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    li {
      font-family: 'Raleway', sans-serif;
      color: var(--text-main);
      font-size: 0.9rem;
      padding-left: 1rem;
      position: relative;

      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: var(--accent-orange);
      }
    }
  }
`

const MotionMasonryContent = motion(MasonryStyles)

// ============================================================================
// Carousel Styles
// ============================================================================

const CarouselStyles = styled.div`
  ${BaseStyles}

  .carouselContainer {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1.5rem;
    padding: 1rem 0 2rem;
    width: 100%;
    scrollbar-width: thin;
    scrollbar-color: var(--primary-green-dark) var(--primary-green);

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: var(--primary-green);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--primary-green-dark);
      border-radius: 4px;

      &:hover {
        background: var(--accent-orange);
      }
    }

    @media ${devices.laptop} {
      justify-content: center;
      flex-wrap: wrap;
      overflow-x: visible;
    }
  }

  .carouselCard {
    flex: 0 0 280px;
    scroll-snap-align: start;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    padding: 2rem 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    min-height: 300px;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 0.9);
    }

    h3 {
      color: var(--primary-green-dark);
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    li {
      font-family: 'Raleway', sans-serif;
      color: var(--text-main);
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
`

const MotionCarouselContent = motion(CarouselStyles)
