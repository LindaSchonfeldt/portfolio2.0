import { useEffect, useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import styled from 'styled-components'

import devices from '../../styles/devices'
import { Button } from '../Button'

const REPO_URL = 'https://github.com/LindaSchonfeldt/portfolio2.0'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

// The same Button component in the four ways the site uses it
const examples = [
  { label: 'Projects', url: '/projects', note: 'Internal route, same tab' },
  { label: 'GitHub', url: REPO_URL, note: 'External link, new tab' },
  {
    label: 'GitHub',
    url: REPO_URL,
    icon: FaGithub,
    iconOnly: true,
    note: 'Icon only'
  },
  {
    label: 'Download CV',
    url: '/pdfs/linda.schonfeldt_cv.pdf',
    note: 'PDF download'
  }
]

// A simplified version of how the browser computes an accessible name:
// aria-label wins, otherwise the text content minus anything aria-hidden
const getAccessibleName = (el) => {
  const label = el.getAttribute('aria-label')
  if (label) return label

  const collect = (node) =>
    [...node.childNodes]
      .map((child) => {
        if (child.nodeType === Node.TEXT_NODE) return child.textContent
        if (child.nodeType !== Node.ELEMENT_NODE) return ''
        if (child.getAttribute('aria-hidden') === 'true') return ''
        return ` ${collect(child)} `
      })
      .join('')

  return collect(el).replace(/\s+/g, ' ').trim()
}

const describe = (el) => {
  const role = el.tagName === 'A' ? 'link' : 'button'
  const extras = el.hasAttribute('download') ? ', downloads a file' : ''
  return `${role}, “${getAccessibleName(el)}”${extras}`
}

const usePrefersReducedMotion = () => {
  const [reduce, setReduce] = useState(
    () => window.matchMedia(REDUCED_MOTION).matches
  )

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION)
    const onChange = (e) => setReduce(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduce
}

export function AccessibilityShowcase() {
  const cellRefs = useRef([])
  const [announcements, setAnnouncements] = useState([])
  const reduceMotion = usePrefersReducedMotion()

  // Read from the rendered elements, so this shows what the code outputs
  useEffect(() => {
    setAnnouncements(
      cellRefs.current.map((cell) => {
        const el = cell?.querySelector('a, button')
        return el ? describe(el) : ''
      })
    )
  }, [])

  return (
    <Showcase>
      <Group>
        <GroupTitle>What you see, and what is announced</GroupTitle>
        <Rows>
          {examples.map(({ note, ...buttonProps }, index) => (
            <Row key={note}>
              <Case>{note}</Case>
              <ButtonCell
                ref={(el) => (cellRefs.current[index] = el)}
                $iconOnly={buttonProps.iconOnly}
              >
                <Button variant='secondary' {...buttonProps} />
              </ButtonCell>
              <div>
                <Label>Accessible name</Label>
                <Announcement>{announcements[index]}</Announcement>
              </div>
            </Row>
          ))}
        </Rows>
        <Hint>
          Press Tab to move through the buttons. Keyboard focus is shown with
          the same orange outline everywhere on the site.
        </Hint>
      </Group>

      <Group>
        <GroupTitle>Reduced motion</GroupTitle>
        <MotionStatus $on={reduceMotion} aria-live='polite'>
          <strong>{reduceMotion ? 'On' : 'Off'}</strong>
          <span>
            {reduceMotion
              ? 'Your device asks for reduced motion, so nothing on the site slides, scales or moves. Elements appear in place instead.'
              : 'Your device does not ask for reduced motion. Turn it on in your system settings and this updates live, along with every animation on the site.'}
          </span>
        </MotionStatus>
      </Group>
    </Showcase>
  )
}

const Showcase = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  margin-top: var(--gap-md);
  padding: var(--gap-sm);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  background: var(--gray-100);

  @media ${devices.tablet} {
    padding: var(--gap-md);
  }
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
`

const GroupTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary-green-dark);
  margin: 0;
`

const Rows = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Row = styled.li`
  display: grid;
  gap: var(--gap-xs);
  align-items: center;
  padding: var(--gap-sm) 0;
  border-bottom: 1px solid var(--gray-200);

  @media ${devices.tablet} {
    grid-template-columns: 10rem 12rem 1fr;
    gap: var(--gap-sm);
  }
`

const Case = styled.span`
  font-weight: 600;
  color: var(--text-main);
`

const Label = styled.span`
  display: block;
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary-green-dark);
`

const ButtonCell = styled.div`
  width: ${({ $iconOnly }) => ($iconOnly ? 'auto' : '12rem')};
  max-width: 100%;

  > * {
    margin-bottom: 0;
  }
`

const Announcement = styled.code`
  font-size: 0.85rem;
  color: var(--primary-green-dark);
`

const Hint = styled.p`
  font-size: 0.9rem;
  margin: 0;
`

const MotionStatus = styled.p`
  display: flex;
  align-items: flex-start;
  gap: var(--gap-sm);
  margin: 0;
  font-size: 0.9rem;

  strong {
    flex: 0 0 auto;
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    background: ${({ $on }) =>
      $on ? 'var(--primary-green-dark)' : 'var(--background-light)'};
    color: ${({ $on }) =>
      $on ? 'var(--text-light)' : 'var(--primary-green-dark)'};
    border: 1px solid var(--primary-green-dark);
  }
`
