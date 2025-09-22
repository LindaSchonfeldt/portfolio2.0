// components/Intro.jsx
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import styled from 'styled-components'

const Intro = ({ onComplete }) => {
  useEffect(() => {
    // Complete the intro after animation finishes
    const timer = setTimeout(() => {
      onComplete()
    }, 4000) // Total duration: 4 seconds

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <IntroContainer>
      {/* Background layers */}
      <BackgroundLayer
        as={motion.div}
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          delay: 1.5
        }}
        color='var(--primary-green-dark)'
      />

      <BackgroundLayer
        as={motion.div}
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          delay: 1.2
        }}
        color='var(--primary-green)'
      />

      {/* White curved shape */}
      <WhiteShape
        as={motion.div}
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 2.5,
          ease: 'easeInOut',
          delay: 0.5
        }}
      />

      {/* Final fade out overlay */}
      <FadeOverlay
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 3.2
        }}
      />
    </IntroContainer>
  )
}

const IntroContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  overflow: hidden;
  background: var(--background-main);
`

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.color};
  transform-origin: left center;
`

const WhiteShape = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 150%;
  height: 100%;
  background: white;
  clip-path: ellipse(60% 100% at 80% 50%);
  transform-origin: right center;

  /* Alternative curved shape - uncomment if you prefer this */
  /* clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%); */
`

const FadeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-main);
`

export default Intro
