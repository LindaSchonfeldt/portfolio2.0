import styled from 'styled-components'

export const Tag = ({ text }) => {
  return <StyledTag>{text}</StyledTag>
}

const StyledTag = styled.span`
  display: inline-block;
  color: var(--text-dark);
  font-size: 1rem;
  font-weight: 400;
  padding: 0.2rem 0.3rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border: black 1px solid;
`
