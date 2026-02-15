import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import styled from 'styled-components'

import { Button } from '../components/Button'
import { HighlightText } from '../components/HighlightText'
import { Logo } from '../components/Logo'
import SectionContainer from '../components/SectionContainer'
import devices from '../styles/devices'

// Lazy load non-critical components
const SocialLinks = lazy(() =>
  import('../components/SocialLinks').then((m) => ({ default: m.SocialLinks }))
)

export const Hero = () => {
  return (
    <SectionContainer id='introduction'>
      <MotionLogoWrapper
        initial={{ scale: 2.5, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Logo size='small' alt='' />
      </MotionLogoWrapper>
      <MotionHeroContent
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        <h3 className='heroPreTitle'>I am Linda Schönfeldt</h3>
        <h1 className='heroTitle'>Web Developer</h1>
        <h2 className='heroSubtitle'>
          With a Bachelor's Degree in Interaction Design
        </h2>
        <div className='heroText'>
          <p>
            I design and build user-centered web experiences, combining
            interaction design with frontend development to create products that
            are clear, usable, and meaningful.
          </p>
          <p>
            My work is driven by a{' '}
            <HighlightText>
              desire to bring clarity to complexity.
            </HighlightText>{' '}
            I enjoy organizing systems—whether that means structuring
            information for better usability, designing intuitive user flows,
            shaping product direction, or writing cleaner, more maintainable
            code. Turning complexity into solutions that feel purposeful and
            human-centered is where I do my best work.
          </p>
          <p>
            I'm especially drawn to mission-driven teams that value empathy,
            curiosity, and thoughtful problem-solving, and that care deeply
            about{' '}
            <HighlightText>
              building products that genuinely support people.
            </HighlightText>
          </p>
        </div>
        <ActionWrapper>
          <ButtonWrapper>
            <Button
              variant='secondary'
              label={'Download CV'}
              className='heroButton'
              url='/linda.schonfeldt_cv.pdf'
              aria-label='Download CV'
            />
            <Button
              variant='primary'
              label={'Contact Me'}
              className=''
              url='/contact'
              aria-label='Contact Me'
            />
          </ButtonWrapper>
          <Suspense fallback={<div style={{ height: '40px' }} />}>
            <SocialLinks />
          </Suspense>
        </ActionWrapper>
      </MotionHeroContent>
    </SectionContainer>
  )
}

const HeroContent = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: left;

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .heroPreTitle {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .heroTitle {
    color: var(--primary-green-dark);
    font-size: 3.7rem;
    line-height: 0.8;
    margin-bottom: 0.7rem;

    ${devices.mobileL} {
      font-size: 5rem;
    }
  }

  .heroSubtitle {
    color: var(--primary-green-dark);
    font-size: 2rem;
    line-height: 1;
    width: 90%;
    margin-bottom: 1.5rem;

    ${devices.mobileL} {
      font-size: 2.5rem;
    }
  }

  .heroText {
    width: 100%;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-top: 2rem;

  a,
  button {
    width: auto;
  }

  @media ${devices.mobileL} {
    a,
    button {
      width: auto;
    }
  }
`

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;

  .socialIcons {
    display: flex;
    gap: var(--gap-md);
    width: 100%;
    justify-content: center;

    @media ${devices.mobileM} {
      gap: var(--gap-lg);
    }

    @media ${devices.mobileL} {
      justify-content: flex-start;
      gap: var(--gap-sm);
    }
  }
`

const LogoWrapper = styled.div`
  align-self: flex-start;
  transform-origin: left center;
  display: inline-block;
`

// Motion components for animations
const MotionLogoWrapper = motion.create(LogoWrapper)
const MotionHeroContent = motion.create(HeroContent)
