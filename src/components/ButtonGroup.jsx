import styled from 'styled-components'

import { Button } from '../components/Button.jsx'

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
          style={row ? { width: 'auto', marginBottom: 0 } : undefined}
        />
      ))}
    </StyledButtonGroup>
  )
}

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: ${({ $row }) => ($row ? 'row' : 'column')};
  flex-wrap: wrap;
  width: ${({ $row }) => ($row ? 'auto' : '100%')};
  gap: 0.5rem;

  ${({ $row }) =>
    $row &&
    `
    & > * {
      width: auto;
    }
  `}
`
