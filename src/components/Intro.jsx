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
      {/* Initial background layer sliding left */}
      <BackgroundLayer
        as={motion.div}
        initial={{ x: '0%' }}
        animate={{ x: '0%' }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 0
        }}
        color='var(--background-main)'
      />

      {/* Left green rectangle - fade in */}
      <GreenRectangle
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
          delay: 0.2
        }}
        color='var(--primary-green-dark)'
        position='left'
      />

      {/* Right green rectangle - fade in */}
      <GreenRectangle
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          delay: 0.4
        }}
        color='var(--primary-green)'
        position='right'
      />

      {/* Background layers */}
      <BackgroundLayer
        as={motion.div}
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          delay: 0.4
        }}
        color='var(--primary-green-dark)'
      />

      {/* White curved shape */}
      <WhiteShape
        as={motion.div}
        initial={{ x: '100%', opacity: 1 }}
        animate={{ x: '-120%', opacity: 0 }}
        transition={{
          x: { duration: 2.6, ease: 'easeInOut', delay: 1.0 },
          opacity: { duration: 0.7, delay: 2.3, ease: 'easeInOut' }
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

const GreenRectangle = styled.div`
  position: absolute;
  top: 0;
  ${(props) => (props.position === 'left' ? 'left: 0;' : 'right: 0;')}
  width: 50%;
  height: 100%;
  background: ${(props) => props.color};
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
  width: 300%;
  height: 100%;
  background: white;
  clip-path: ellipse(50% 100% at 80% 50%);
  transform-origin: right center;
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
