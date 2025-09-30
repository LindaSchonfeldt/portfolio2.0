import styled from 'styled-components'

export const Button = ({
  label,
  url,
  variant = 'button',
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
        {...props}
      >
        {label}
      </StyledButton>
    )
  }
  return (
    <StyledButton type='button' onClick={onClick} {...props}>
      {label}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: inline-block;
  width: auto;
  min-width: 120px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  border-radius: 4px;
  background-color: var(--primary-green-dark);
  color: var(--text-light);
  border: 2px solid var(--primary-green-dark);
  text-align: center;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--primary-green);
    opacity: 0.9;
  }
`
