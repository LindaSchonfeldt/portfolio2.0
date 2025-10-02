import styled, { css } from 'styled-components'

export const Tag = ({ text, variant = 'tag' }) => {
  return <StyledTag variant={variant}>{text}</StyledTag>
}

const tagStyles = css`
  background-color: black;
  color: var(--text-light);
  border: white 1px solid;
`

const categoryStyles = css`
  background-color: var(--accent-orange);
  color: var(--text-main);
  border: none;
  font-weight: 600;
`

const StyledTag = styled.span`
  display: inline-block;
  font-family: 'Raleway', sans-serif;
  font-size: 0.8rem;
  padding: 0.2rem 0.3rem;
  margin-right: 0.2rem;
  margin-bottom: 0.5rem;
  ${({ variant }) => (variant === 'category' ? categoryStyles : tagStyles)}
`
