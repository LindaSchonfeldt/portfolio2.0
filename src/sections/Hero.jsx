import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Hero = () => {
  return (
    <Section>
      <MotionHeroContent
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
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
            What drives me is the desire to bring clarity to complexity. I love
            organizing — whether it's structuring information for better
            usability, designing intuitive user flows, mapping out a product
            roadmap, or learning to write cleaner, more maintainable code.
            Turning chaos into something clear, purposeful, and human-centered
            is where I thrive.
          </p>
          <p>
            I'm especially drawn to mission-driven teams that lead with empathy,
            value curiosity, and care deeply about building thoughtful,
            empowering products.
          </p>
        </div>
      </MotionHeroContent>
    </Section>
  )
}

const Section = styled.section`
  background: var(--background-light);
  padding: var(--section-padding);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
`

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
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
    font-size: 5rem;
    line-height: 0.8;
    margin-bottom: 0.7rem;
  }

  .heroSubtitle {
    color: var(--primary-green-dark);
    font-size: 2.5rem;
    line-height: 1;
    width: 90%;
    margin-bottom: 1.5rem;
  }

  .heroText {
    width: 100%;
  }
`
// Motion components for animation
const MotionHeroContent = motion(HeroContent)
