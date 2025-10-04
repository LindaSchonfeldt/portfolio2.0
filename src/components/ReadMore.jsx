import { useState } from 'react'
import styled from 'styled-components'

export const ReadMore = ({ text, maxLength = 150 }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > maxLength
  const displayText =
    expanded || !isLong ? text : text.slice(0, maxLength) + '...'

  return (
    <div>
      <p>{displayText}</p>
      {isLong && (
        <StyledLink
          as='span'
          onClick={() => setExpanded(!expanded)}
          tabIndex={0}
          role='button'
        >
          {expanded ? 'Show Less' : 'Read More'}
        </StyledLink>
      )}
    </div>
  )
}

const StyledLink = styled.a`
  color: var(--primary-green-dark);
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.95em;
  font-family: 'Raleway', sans-serif;
  background: none;
  border: none;
  padding: 0;
  display: inline-block;
  &:hover {
    text-decoration: underline wavy;
    color: var(--primary-green);
  }
`
