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

// Blob images for skill cards (place files in public/images/skills)
const blobImages = [
  '/images/skills/blob_1.png',
  '/images/skills/blob_2.png',
  '/images/skills/blob_3.png',
  '/images/skills/blob_4.png',
  '/images/skills/blob_5.png'
]

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
            {skillsData.skills.map((skillGroup, index) => {
              const IconComponent = iconMap[skillGroup.category]
              const blobImage =
                blobImages[index % blobImages.length] || blobImages[0]
              return (
                <div
                  className='skillCard'
                  key={skillGroup.category}
                  style={{
                    backgroundImage: `url(${blobImage})`
                  }}
                >
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
    background-color: transparent;
    padding: 1rem;
    transition:
      transform 0.2s ease,
      filter 0.2s ease;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.15));
  }

  .skillCard:hover {
    transform: scale(1.04);
    filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.22));
  }

  .cardHeader {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0.75rem 1.25rem 0.75rem 3.5rem;
    margin-bottom: 0;
    background: transparent;
  }

  h3 {
    color: var(--text-light);
    margin: 0;
    font-size: 1.35rem;
    font-weight: 700;
    flex: 1;
  }

  .skillTags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    padding: 1rem 1.25rem 1.5rem 3.5rem;
  }

  .tag {
    display: inline-block;
    color: var(--text-light);
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Raleway', sans-serif;
    padding: 0.2rem 0.3rem;
    margin-bottom: 0.2rem;
    transition: all 0.15s ease;
  }
`
