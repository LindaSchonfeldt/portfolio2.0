import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

import devices from '../styles/devices'

export function ButtonGroup({ actions = [] }) {
  console.log('ButtonGroup received actions:', actions) // Debug log

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
            text={action.text}
            href={action.href}
            onClick={action.onClick}
            target={action.target}
            variant={action.variant || 'primary'}
            internal={action.internal}
            className={action.className}
          />
        )
      })}
    </StyledButtonGroup>
  )
}

export default function Button({
  text,
  href,
  onClick,
  target = '_self',
  variant = 'primary', // 'primary' | 'secondary' | 'tertiary'
  internal = false,
  className = '',
  children
}) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (href) {
      if (internal) {
        navigate(href)
      } else {
        window.open(href, target, 'noopener,noreferrer')
      }
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <StyledButton
      $variant={variant} // Transient prop
      className={className}
      onClick={handleClick}
    >
      {text || children}
    </StyledButton>
  )
}

const hover = css`
  &:hover {
    background-color: var(--primary-green);
    opacity: 0.9;
  }
`
const secondaryHover = css`
  &:hover {
    background-color: var(--primary-green-dark);
    opacity: 0.9;
    color: var(--text-light);
  }
`

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  border-radius: 4px;

  @media ${devices.tablet} {
    padding: 0.8rem 1.8rem;
    font-size: 1.1rem;
  }

  /* Primary */
  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: var(--primary-green-dark);
      color: var(--text-light);
      border: 2px solid var(--primary-green-dark);
      transition: all 0.2s ease-in-out;

      ${hover}
    `}

  /* Secondary */
   ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: transparent;
      color: var(--primary-green-dark);
      border: 2px solid var(--primary-green-dark);
      transition: all 0.2s ease-in-out;

      ${secondaryHover}
    `}

  /* Tertiary */
  ${({ $variant }) =>
    $variant === 'tertiary' &&
    css`
      background: none;
      color: var(--text-main);
      text-decoration: underline;
      border: none;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: var(--primary-green-dark);
        text-decoration: none;
      }
    `}

  /* Disabled - for under construction */
  ${({ $variant }) =>
    $variant === 'disabled' &&
    css`
      background-color: var(--gray-200);
      color: var(--text-main);
      border: 2px solid var(--gray-100);
      cursor: not-allowed;
      opacity: 0.6;

      /* No hover effects */
      &:hover {
        background-color: var(--gray-200);
        color: var(--text-main);
        opacity: 0.6;
      }
    `}
`

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
