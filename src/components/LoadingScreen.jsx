import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { preloadRoute } from '../utils/routePreloader'

const SLIDE_IN_MS = 1400
const HOLD_MS = 350
const SLIDE_UP_MS = 900

const LoadingScreen = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0)
  const [phase, setPhase] = useState('slideIn')

  useEffect(() => {
    let rafId
    let cancelled = false
    let finished = false
    let homeLoaded = false
    let fastCountDone = false

    preloadRoute('home').then(() => {
      homeLoaded = true
      if (fastCountDone) finish()
    })

    const finish = () => {
      if (cancelled || finished) return
      finished = true
      cancelAnimationFrame(rafId)
      setPercentage(100)
      setTimeout(() => {
        if (!cancelled) {
          setPhase('slideUp')
          setTimeout(onComplete, SLIDE_UP_MS + 100)
        }
      }, HOLD_MS)
    }

    // Phase 1: fast count 0→90 over SLIDE_IN_MS
    const fastStart = performance.now()
    const fastCount = (now) => {
      if (cancelled) return
      const p = Math.min((now - fastStart) / SLIDE_IN_MS, 1)
      setPercentage(Math.round(p * 90))
      if (p < 1) {
        rafId = requestAnimationFrame(fastCount)
        return
      }
      fastCountDone = true
      if (homeLoaded) {
        finish()
      } else {
        // Phase 2: slow crawl 90→99 while waiting for chunk
        const slowStart = performance.now()
        const slowCount = (now) => {
          if (cancelled || finished) return
          const p = Math.min((now - slowStart) / 10000, 1)
          setPercentage(90 + Math.round(p * 9))
          rafId = requestAnimationFrame(slowCount)
        }
        rafId = requestAnimationFrame(slowCount)
      }
    }
    rafId = requestAnimationFrame(fastCount)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
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
