import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

export const ReadMore = ({ text, maxHeight = '4.5em', className }) => {
  const [expanded, setExpanded] = useState(false)
  const [needsTruncation, setNeedsTruncation] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollHeight > textRef.current.clientHeight
      setNeedsTruncation(isOverflowing)
    }
  }, [text, maxHeight])

  return (
    <Container className={className}>
      <TextContent ref={textRef} $expanded={expanded} $maxHeight={maxHeight}>
        {text}
      </TextContent>
      {needsTruncation && (
        <StyledLink
          as='span'
          onClick={() => setExpanded(!expanded)}
          tabIndex={0}
          role='button'
        >
          {expanded ? 'Show Less' : 'Read More'}
        </StyledLink>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const TextContent = styled.p`
  margin: 0;
  max-height: ${({ $expanded, $maxHeight }) =>
    $expanded ? 'none' : $maxHeight};
  overflow: hidden;
  transition: max-height 0.3s ease;
`

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
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
    color: var(--accent-orange);
  }
`
