import styled from 'styled-components'

import { Button } from '../components/Button.jsx'
import devices from '../styles/devices'

export const ButtonGroup = ({ actions }) => {
  if (!actions || actions.length === 0) {
    return null
  }

  return (
    <StyledButtonGroup>
      {actions.map((action, index) => (
        <Button
          key={index}
          label={action.label}
          url={action.url}
          type={action.type}
          onClick={action.onClick}
          variant={action.variant || (action.url ? 'link' : 'button')}
        />
      ))}
    </StyledButtonGroup>
  )
}

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${devices.tablet} {
    flex-direction: row;
    gap: 0.5rem;
  }
`
