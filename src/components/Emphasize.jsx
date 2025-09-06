import { motion } from 'framer-motion'
import styled from 'styled-components'

// Create a styled motion component
const StyledSpan = styled.span`
  position: relative;
  display: inline-block;
  color: var(--text-main);
  font-weight: 600;
  z-index: 1;
`

// Create the actual component with animation
export const Emphasize = ({ children, delay = false }) => {
  // Base delay is 0.3s, with additional 0.5s if delay prop is true
  const animationDelay = delay ? 1.5 : 1.0

  return (
    <StyledSpan>
      {children}
      <motion.span
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '0',
          right: '0',
          height: '40%',
          width: '100%',
          backgroundColor: 'var(--accent-orange)',
          transformOrigin: 'left',
          opacity: 0.4,
          zIndex: -1
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a more natural highlighting feel
          delay: animationDelay
        }}
      />
    </StyledSpan>
  )
}
