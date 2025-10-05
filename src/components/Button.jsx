import styled from 'styled-components'
import { buttonBase } from '../styles/mixins'

export const Button = ({
  label,
  url,
  variant = 'button',
  type = 'button',
  onClick,
  ...props
}) => {
  if (variant === 'link') {
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
  return (
    <StyledButton type={type} onClick={onClick} $variant={variant} {...props}>
      {label}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  ${buttonBase}
  min-width: 120px;
  background-color: var(--primary-green-dark);
  color: var(--text-light);
  border-color: var(--primary-green-dark);
  margin-bottom: 0.5rem;

  &:hover {
    background-color: var(--primary-green);
    opacity: 0.9;
  }

  ${({ $variant }) =>
    $variant === 'secondary' &&
    `
      background-color: var(--background-light);
      color: var(--primary-green-dark);
      border-color: var(--primary-green-dark);
    `}
`
