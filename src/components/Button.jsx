import styled from 'styled-components'
import { buttonBase } from '../styles/mixins'

export const Button = ({
  label,
  url,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) => {
  // If url is provided, render as a link
  if (url) {
    // Check if it's a PDF download
    const isPDF = url.toLowerCase().endsWith('.pdf')

    return (
      <StyledButton
        as='a'
        href={disabled ? undefined : url}
        target='_blank'
        rel='noopener noreferrer'
        download={isPDF && !disabled ? true : undefined}
        $variant={variant}
        $disabled={disabled}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        {...props}
      >
        {label}
      </StyledButton>
    )
  }
  // Otherwise render as a button
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      $variant={variant}
      disabled={disabled}
      $disabled={disabled}
      {...props}
    >
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

  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    `
      background-color: #e0e0e0;
      color: #9e9e9e;
      border-color: #bdbdbd;
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;

      &:hover {
        background-color: #e0e0e0;
        color: #9e9e9e;
        opacity: 0.6;
      }
    `}
`
