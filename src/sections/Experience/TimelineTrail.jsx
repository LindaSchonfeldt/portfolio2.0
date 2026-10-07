import { motion, useReducedMotion } from 'framer-motion'
import { useId } from 'react'
import styled from 'styled-components'

export const TimelineTrail = ({ trail, progress }) => {
  const maskId = useId()
  const reduceMotion = useReducedMotion()

  return (
    <Trail
      aria-hidden='true'
      width={trail.width}
      height={trail.height}
      viewBox={`0 0 ${trail.width} ${trail.height}`}
    >
      <defs>
        <mask
          id={maskId}
          maskUnits='userSpaceOnUse'
          x='-20'
          y='-20'
          width={trail.width + 40}
          height={trail.height + 40}
        >
          <TrailReveal
            d={trail.d}
            style={{ pathLength: reduceMotion ? 1 : progress }}
          />
        </mask>
      </defs>
      <TrailGround d={trail.d} />
      <TrailSteps d={trail.d} mask={`url(#${maskId})`} />
    </Trail>
  )
}

const Trail = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  pointer-events: none;
`

// Mask stroke that grows with scroll progress
const TrailReveal = styled(motion.path)`
  fill: none;
  stroke: white;
  stroke-width: 10;
`

// The worn ground of the path
const TrailGround = styled.path`
  fill: none;
  stroke: var(--primary-green);
  stroke-width: 12;
  stroke-linecap: round;
  opacity: 0.5;
`

// Footsteps along the path, revealed by the scroll-driven mask
const TrailSteps = styled.path`
  fill: none;
  stroke: var(--primary-green-dark);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 6 9;
`
