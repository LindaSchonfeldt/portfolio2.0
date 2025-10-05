import styled from 'styled-components'
import { buttonBase } from '../styles/mixins'

export const Button = ({
  label,
  url,
  variant = 'primary',
  type = 'button',
  onClick,
  ...props
}) => {
  // If url is provided, render as a link
  if (url) {
    return (
      <StyledButton
        as='a'
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        $variant={variant}
        {...props}
      >
        {label}
      </StyledButton>
    )
  }
  // Otherwise render as a button
  return (
    <StyledButton type={type} onClick={onClick} $variant={variant} {...props}>
      {label}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  ${buttonBase}
  min-width: 120px;
  margin-bottom: 0.5rem;

  /* Primary variant (default) */
  ${({ $variant }) =>
    (!$variant || $variant === 'primary') &&
    `
      background-color: var(--primary-green-dark);
      color: var(--text-light);
      border-color: var(--primary-green-dark);

      &:hover {
        background-color: var(--primary-green);
        opacity: 0.9;
      }
    `}

  /* Secondary variant */
  ${({ $variant }) =>
    $variant === 'secondary' &&
    `
      background-color: var(--background-light);
      color: var(--primary-green-dark);
      border-color: var(--primary-green-dark);

      &:hover {
        background-color: var(--primary-green-dark);
        color: var(--text-light);
      }
    `}
`
