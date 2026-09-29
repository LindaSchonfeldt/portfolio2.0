// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

import { Meta, SectionContainer } from '../components'

const About = () => {
  return (
    <>
      <Meta
        title='About | Linda Schönfeldt Portfolio'
        description='Learn more about Linda Schönfeldt, her background, skills, and experience in web development and UX design.'
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <SectionContainer id='about'>
          <h2>About</h2>
          <p>
            I'm Linda, a frontend developer and interaction designer based in
            Stockholm.
          </p>
          <p>
            I've always been curious about how people think, feel and make
            decisions. That curiosity led me to cognitive science, then to a
            bachelor's degree in Interaction Design, and eventually to code. I
            switched careers to frontend development because I wanted to build
            the things I was designing, not just sketch them.
          </p>
          <p>
            My interest in mental health isn't only professional. I know from my
            own life how much the right support, at the right time, can matter.
            That's why I want to work on products that help people take care of
            themselves, especially within mental health, healthtech and femtech.
            When someone opens an app on a hard day, I want it to feel calm,
            clear and kind.
          </p>
          <p>
            Since graduating from Technigo's web development program, I've
            worked with React, JavaScript and Tailwind, and spent six months at
            Univid, a B2B SaaS webinar platform, working in an agile,
            interdisciplinary team. I enjoy the space where design and
            development meet, and I'm especially drawn to design systems:
            building structures that make products consistent and easier to use.
          </p>
          <p>
            I also love to learn. I'm currently exploring TypeScript, Next.js,
            Outside of work, I'm happiest when I'm creating something,
            organizing something, or ideally both.
          </p>
        </SectionContainer>
      </motion.div>
    </>
  )
}

export default About
