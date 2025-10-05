import styled, { css } from 'styled-components'

export const Tag = ({ text, variant = 'tag' }) => {
  return <StyledTag $variant={variant}>{text}</StyledTag>
}

const tagStyles = css`
  background-color: black;
  color: var(--text-light);
  font-size: 0.8rem;
  font-weight: 500;
  margin-right: 0.2rem;
`

const categoryStyles = css`
  background-color: var(--background-green);
  color: var(--text-main);
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.3rem 0.5rem;
  margin-right: 0.5rem;
`

const StyledTag = styled.span`
  display: inline-block;
  font-family: 'Raleway', sans-serif;
  padding: 0.2rem 0.3rem;
  margin-bottom: 0.5rem;

  ${({ $variant }) => ($variant === 'category' ? categoryStyles : tagStyles)}
`
