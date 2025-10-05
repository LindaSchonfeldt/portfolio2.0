// components/Intro.jsx
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import styled from 'styled-components'

const Intro = ({ onComplete }) => {
  useEffect(() => {
    // Complete the intro after the white shape animation finishes
    // White shape animation: starts at 1.0s delay + 2.6s duration = 3.6s total
    const timer = setTimeout(() => {
      onComplete()
    }, 3700) // Small buffer after white shape completes

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <IntroContainer>
      {/* Initial background layer - fade out to reveal page */}
      <BackgroundLayer
        as={motion.div}
        initial={{ x: '0%', opacity: 1 }}
        animate={{ x: '0%', opacity: 0 }}
        transition={{
          x: { duration: 1, ease: 'easeInOut', delay: 0 },
          opacity: { duration: 0.3, ease: 'easeInOut', delay: 1.8 }
        }}
        color='var(--background-main)'
      />

      {/* Left green rectangle - fade in then fade out */}
      <GreenRectangle
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.8,
          times: [0, 0.5, 1], // fade in quickly, then fade out
          ease: 'easeInOut',
          delay: 0.2
        }}
        color='var(--primary-green-dark)'
        position='left'
      />

      {/* Right green rectangle - fade in then fade out */}
      <GreenRectangle
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.6,
          times: [0, 0.6, 1], // fade in, then fade out
          ease: 'easeInOut',
          delay: 0.4
        }}
        color='var(--primary-green)'
        position='right'
      />

      {/* Background layers - slide and fade out */}
      <BackgroundLayer
        as={motion.div}
        initial={{ x: '0%', opacity: 1 }}
        animate={{ x: '-100%', opacity: 0 }}
        transition={{
          x: { duration: 1.5, ease: 'easeInOut', delay: 0.4 },
          opacity: { duration: 0.3, ease: 'easeInOut', delay: 1.6 }
        }}
        color='var(--primary-green-dark)'
      />

      {/* White curved shape - final animation */}
      <WhiteShape
        as={motion.div}
        initial={{ x: '100%', opacity: 1 }}
        animate={{ x: '-120%', opacity: 1 }}
        transition={{
          x: { duration: 2.6, ease: 'easeInOut', delay: 1.0 }
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

export default Intro
