import styled from 'styled-components'

import { Button } from '../components/Button.jsx'
import devices from '../styles/devices'

export const ButtonGroup = ({ actions }) => {
  if (!actions || actions.length === 0) {
    console.log('ButtonGroup: No actions provided')
    return null
  }

  return (
    <StyledButtonGroup>
      {actions.map((action, index) => {
        console.log(`Rendering button ${index}:`, action)
        return (
          <Button
            key={index}
            label={action.label}
            url={action.url}
            type={action.type}
            // ...other props if needed
          />
        )
      })}
    </StyledButtonGroup>
  )
}

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 0.5rem;
  width: 100%;

  @media ${devices.tablet} {
    flex-direction: row;
    gap: 1rem;
  }
`
