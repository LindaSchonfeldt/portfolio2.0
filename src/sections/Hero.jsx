import { motion } from 'framer-motion'
import styled from 'styled-components'

import { Button } from '../components/Button'
import { Emphasize } from '../components/Emphasize'
import { Logo } from '../components/Logo'
import SectionContainer from '../components/SectionContainer'
import { SocialLinks } from '../components/SocialLinks'
import devices from '../styles/devices'

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
        as={HeroContent}
      >
        <h3 className='heroPreTitle'>I am Linda Schönfeldt</h3>
        <h1 className='heroTitle'>Web Developer</h1>
        <h2 className='heroSubtitle'>
          With a Bachelor's Degree in Interaction Design
        </h2>
        <div className='heroText'>
          <p>
            With a background in service and interaction design, I'm passionate
            about building technology that truly understands user needs and
            creates meaningful impact.
          </p>
          <p>
            What drives me is the{' '}
            <Emphasize delay>desire to bring clarity to complexity.</Emphasize>{' '}
            I love organizing — whether it's structuring information for better
            usability, designing intuitive user flows, mapping out a product
            roadmap, or learning to write cleaner, more maintainable code.
            Turning chaos into something clear, purposeful, and human-centered
            is where I thrive.
          </p>
          <p>
            I'm especially drawn to{' '}
            <Emphasize delay>mission-driven teams</Emphasize> that lead with
            empathy, value curiosity, and care deeply about building thoughtful,
            empowering products.
          </p>
        </div>
        <ActionWrapper>
          <ButtonWrapper>
            <Button
              variant='primary'
              className='heroButton'
              href='/cv.pdf'
              target='_blank'
              aria-label='Download CV'
            >
              Download CV
            </Button>
          </ButtonWrapper>
          <SocialLinks />
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
  display: inline-block;
  width: 100%;

  Button {
    width: 100%;
  }

  @media ${devices.mobileL} {
    Button {
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

// Motion components for animation
const MotionHeroContent = motion(HeroContent)

const LogoWrapper = styled.div`
  align-self: flex-start;
  transform-origin: left center;
  display: inline-block;
`

const MotionLogoWrapper = motion(LogoWrapper)
