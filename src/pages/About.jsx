// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { Meta, SectionContainer } from '../components'
import devices from '../styles/devices'

const About = () => {
  return (
    <>
      <Meta
        title='About | Linda Schönfeldt Portfolio'
        description='Learn more about Linda Schönfeldt, a frontend developer with a background in interaction design.'
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <SectionContainer id='about'>
          <StyledText>
            <h1>About</h1>
            <p className='lead'>
              I'm Linda, and I build things with a purpose, as a frontend
              developer with a background in interaction design. I grew up in
              the north of Sweden, and after almost 20 years in Stockholm, I'm
              still a "norrlänning" at heart. People sometimes tell me I seem
              calm. I like to think that's the north in me.
            </p>
            <h2>Why I design the way I do</h2>
            <p>
              I've always been curious about how people think, feel and make
              decisions. Studying cognitive science, I was fascinated by memory
              and by the mental templates we carry for how things are supposed
              to look and work. Most of all, I was drawn to how we're influenced
              without noticing it. That became the focus of my bachelor's thesis
              in Interaction Design, on how dark patterns in social media apps
              undermine user autonomy. It taught me that design is an ethical
              responsibility: if we can shape people's behavior without them
              noticing, we'd better use that to help them.
            </p>
            <h2>Why healthtech</h2>
            <p>
              My interest in healthtech isn't only professional. I know from my
              own life how hard it can be to ask for help: not knowing where to
              turn, whether you'll be taken seriously, or if it's even worth
              trying. When I needed support, there weren't many digital options.
              Today there are, and I think lowering that threshold is one of the
              most meaningful things technology can do. That's what I explored
              in my case study on Din Psykolog's onboarding, and it's why I want
              to work within mental health and women's health. When someone
              opens an app on a hard day, I want it to feel calm, clear and
              kind. Getting there means never assuming I know what users need,
              which is why I care so much about user interviews and testing.
            </p>
            <h2>What I'm looking for</h2>
            <p>
              I'm looking for a frontend role close to design: building
              interfaces in React and TypeScript while ideally also taking part
              in user interviews, prototyping and conversations about flows.
              Over time, I'd love to grow into design systems, where structure
              and user experience meet. I thrive in small, close-knit teams
              where decisions don't have to pass through several layers, where
              we iterate quickly and I get real ownership of what I build.
              During my internship at Univid I loved having that kind of
              ownership, and I learned how much I value having time to try new
              things. Most of all, I want to work somewhere that puts users
              before short-term profit, and thinks long term about what digital
              health products do to the people who use them.
            </p>
            <h2>Outside of work</h2>
            <p>
              Outside of work, I'm happiest when I'm creating or organizing
              something. I garden, knit and crochet, and nothing satisfies me
              quite like turning a mess into a space where everything has its
              place (I may own a few too many storage boxes). I love walking and
              hiking in nature, and I'm dreaming of having a dog again.
            </p>
          </StyledText>
        </SectionContainer>
      </motion.div>
    </>
  )
}

export default About

const StyledText = styled.div`
  max-width: 65ch;

  h1 {
    margin-bottom: 1rem;
  }

  h2 {
    size: 1rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  p:not(.lead) {
    line-height: 1.7;

    @media ${devices.laptop} {
      font-size: 1.125rem;
    }
  }
`
