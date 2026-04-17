import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const SLIDE_IN_MS = 1400
const HOLD_MS = 350
const SLIDE_UP_MS = 900

const LoadingScreen = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0)
  const [phase, setPhase] = useState('slideIn')

  useEffect(() => {
    const start = performance.now()
    let rafId

    const updatePct = (now) => {
      const elapsed = now - start
      const p = Math.min(elapsed / SLIDE_IN_MS, 1)
      setPercentage(Math.round(p * 100))
      if (p < 1) rafId = requestAnimationFrame(updatePct)
    }
    rafId = requestAnimationFrame(updatePct)

    const slideUpTimer = setTimeout(() => setPhase('slideUp'), SLIDE_IN_MS + HOLD_MS)
    const completeTimer = setTimeout(onComplete, SLIDE_IN_MS + HOLD_MS + SLIDE_UP_MS + 100)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(slideUpTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <Container>
      <Overlay
        as={motion.div}
        initial={{ x: '-100%', y: '0%' }}
        animate={
          phase === 'slideIn'
            ? { x: '0%', y: '0%' }
            : { x: '0%', y: '-100%' }
        }
        transition={
          phase === 'slideIn'
            ? { duration: SLIDE_IN_MS / 1000, ease: [0.76, 0, 0.24, 1] }
            : { duration: SLIDE_UP_MS / 1000, ease: [0.76, 0, 0.24, 1] }
        }
      >
        <PercentageText>{percentage}%</PercentageText>
      </Overlay>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-dark);
  will-change: transform;
`

const PercentageText = styled.span`
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  font-family: 'Jost', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  color: var(--primary-green);
  letter-spacing: 0.05em;
  line-height: 1;
`

export default LoadingScreen
