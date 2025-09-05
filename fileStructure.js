// Example third-party library
// Custom hooks - example: import { THEME_COLORS } from '../hooks/useCustomHook'
// Components - example: import { SubComponent } from '../components/SubComponent'
// Assets, utils, constants
import { THEME_COLORS } from '../constants'
import { motion } from 'framer-motion'
// Third-party libraries
import PropTypes from 'prop-types'
/**
 * React Component File Structure Example
 * This file shows the recommended order and organization for a React component
 * using styled-components and Framer Motion
 */

// ========================================
// 1. IMPORTS
// ========================================
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// Example constant import

// ========================================
// 2. ANIMATION VARIANTS (if using Framer Motion)
// ========================================
const componentAnimationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// ========================================
// 3. COMPONENT FUNCTION
// ========================================
export const ComponentName = ({ prop1, prop2 }) => {
  // 3.1 State and hooks
  const [isActive, setIsActive] = useState(false)

  // 3.2 Effects
  useEffect(() => {
    // Example effect - update state based on prop1
    if (prop1) {
      setIsActive(true)
    }
  }, [prop1])

  // 3.3 Event handlers and other functions
  const handleToggle = () => {
    setIsActive(!isActive)
    console.log(`Status toggled. Active: ${!isActive}, Content: ${prop2}`)
  }

  // 3.4 Render/return
  return (
    <Container active={isActive}>
      <MotionElement
        variants={componentAnimationVariants}
        initial='hidden'
        animate='visible'
      >
        <h2>{prop1}</h2>
        <p>{prop2}</p>
        <button onClick={handleToggle}>
          {isActive ? 'Active' : 'Inactive'}
        </button>
      </MotionElement>
    </Container>
  )
}

// ========================================
// 4. STYLED COMPONENTS
// ========================================
const Container = styled.div`
  padding: 2rem;
  background-color: ${(props) => (props.active ? '#f0f8ff' : '#f5f5f5')};
  border-radius: 8px;
  transition: background-color 0.3s ease;
`

// ========================================
// 5. MOTION COMPONENTS
// ========================================
// Option 1: Create motion component from a styled component
const Element = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  button {
    padding: 0.5rem 1rem;
    background: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`
const MotionElement = motion(Element)

// Option 2: Create inline motion styled component
const MotionInline = motion(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`)

// ========================================
// 6. PROP TYPES
// ========================================
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.string
}

ComponentName.defaultProps = {
  prop1: 'Default Title',
  prop2: 'Default content for this component'
}

// ========================================
// 7. EXPORT (if not exported at declaration)
// ========================================
export default ComponentName
