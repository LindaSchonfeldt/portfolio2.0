import { Meta, SectionContainer } from '../components'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

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
          <h2>About</h2>
          <p>Coming soon...</p>
        </SectionContainer>
      </motion.div>
    </>
  )
}

export default About
