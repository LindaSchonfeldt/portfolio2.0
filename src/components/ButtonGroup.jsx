import styled from 'styled-components'

import { Button } from './Button'
import devices from '../styles/devices'

export const ButtonGroup = ({ actions, row = false }) => {
  if (!actions || actions.length === 0) {
    return null
  }

  return (
    <StyledButtonGroup $row={row}>
      {actions.map((action, index) => (
        <Button
          key={index}
          label={action.label}
          url={action.url}
          type={action.type}
          onClick={action.onClick}
          variant={action.variant || (action.url ? 'link' : 'button')}
          disabled={action.disabled}
        />
      ))}
    </StyledButtonGroup>
  )
}

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;

  @media ${devices.tablet} {
    flex-direction: ${({ $row }) => ($row ? 'row' : 'column')};
    width: 100%;

    ${({ $row }) => $row && `
      flex: 1;
      & > * {
        flex: 1;
        width: auto;
        margin-bottom: 0;
      }
    `}
  }
`
