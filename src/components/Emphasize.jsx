import { motion } from 'framer-motion'
import { useState } from 'react'
import styled from 'styled-components'

export const Emphasize = ({ children }) => {
  const [highlighted, setHighlighted] = useState(false)
  const MotionSpan = motion.span

  // Handler for pointer over (triggers highlight)
  const handleHighlight = () => {
    console.log('onPointerOver fired')
    if (!highlighted) setHighlighted(true)
  }

  return (
    <StyledSpan onPointerOver={handleHighlight} onFocus={handleHighlight}>
      {children}
      <MotionSpan
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '0',
          right: '0',
          height: '40%',
          width: '100%',
          backgroundColor: 'var(--accent-orange)',
          transformOrigin: 'left',
          opacity: 0.4, // back to normal
          zIndex: -1 // behind text
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: highlighted ? 1 : 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: 0
        }}
      />
    </StyledSpan>
  )
}

const StyledSpan = styled.span`
  position: relative;
  display: inline-block;
  color: var(--text-main);
  font-weight: 600;
  z-index: 0;
`
