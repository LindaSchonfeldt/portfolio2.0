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
            This is the about page. Here you can include information about
            yourself, your background, skills, and experience.
          </p>
        </SectionContainer>
      </motion.div>
    </>
  )
}

export default About
