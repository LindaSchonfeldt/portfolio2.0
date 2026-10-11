import { useEffect, useState } from 'react'
import styled from 'styled-components'

import devices, { sizes } from '../../styles/devices'
import { Button } from '../Button'

const colorTokens = [
  { name: '--primary-green-dark', label: 'Primary dark' },
  { name: '--primary-green', label: 'Primary' },
  { name: '--accent-orange', label: 'Accent orange' },
  { name: '--accent-red', label: 'Accent red' },
  { name: '--text-main', label: 'Text' },
  { name: '--background-light', label: 'Background' }
]

const spacingTokens = ['--gap-xs', '--gap-sm', '--gap-md', '--gap-lg']

const typeSamples = [
  { tag: 'h1', label: 'Heading 1 · Jost 600' },
  { tag: 'h2', label: 'Heading 2 · Jost 600' },
  { tag: 'h3', label: 'Heading 3 · Jost 500' },
  {
    tag: 'p',
    label: 'Body · Raleway 400',
    text: 'Body text is set in Raleway for readability at small sizes.'
  },
  {
    tag: 'p',
    label: 'Controls · Raleway 500',
    text: 'Choices and toggles use a slightly heavier weight.',
    style: { fontWeight: 500 }
  }
]

// Read token values from the live CSS so the showcase never drifts from the code
const readTokens = (names) => {
  const styles = getComputedStyle(document.documentElement)
  return Object.fromEntries(
    names.map((name) => [name, styles.getPropertyValue(name).trim()])
  )
}

// Name of the largest breakpoint that currently matches
const getActiveBreakpoint = () =>
  Object.keys(sizes)
    .filter((key) => window.matchMedia(devices[key]).matches)
    .pop() ?? null

export function DesignSystemShowcase() {
  const [values, setValues] = useState({})
  const [activeBreakpoint, setActiveBreakpoint] = useState(null)

  useEffect(() => {
    const update = () => {
      setValues(
        readTokens([...colorTokens.map((t) => t.name), ...spacingTokens])
      )
      setActiveBreakpoint(getActiveBreakpoint())
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <Showcase>
      <Group>
        <GroupTitle>Color</GroupTitle>
        <Swatches>
          {colorTokens.map(({ name, label }) => (
            <li key={name}>
              <Swatch style={{ background: `var(${name})` }} />
              <TokenLabel>{label}</TokenLabel>
              <TokenValue>{values[name]}</TokenValue>
              <TokenName>{name}</TokenName>
            </li>
          ))}
        </Swatches>
      </Group>

      <Group>
        <GroupTitle>Typography</GroupTitle>
        <TypeList>
          {typeSamples.map((sample) => {
            const { tag: Tag, label, text, style } = sample
            return (
              <li key={label}>
                <TokenName>{label}</TokenName>
                {/* Real elements so the global type styles apply, without
                    adding extra headings to the page outline */}
                <Tag role='presentation' style={style}>
                  {text || 'Designed and built in code'}
                </Tag>
              </li>
            )
          })}
        </TypeList>
      </Group>

      <Group>
        <GroupTitle>Spacing</GroupTitle>
        <SpacingList>
          {spacingTokens.map((name) => (
            <li key={name}>
              <TokenName>{name}</TokenName>
              <SpacingBar style={{ width: `var(${name})` }} />
              <TokenValue>{values[name]}</TokenValue>
            </li>
          ))}
        </SpacingList>
      </Group>

      <Group>
        <GroupTitle>Buttons</GroupTitle>
        <ButtonRow>
          <Button label='Primary' variant='primary' />
          <Button label='Secondary' variant='secondary' />
          <Button label='Tertiary' variant='tertiary' />
        </ButtonRow>
      </Group>

      <Group>
        <GroupTitle>Breakpoints</GroupTitle>
        <BreakpointList>
          {Object.entries(sizes).map(([key, value]) => (
            <Breakpoint key={key} $active={key === activeBreakpoint}>
              <span>{key}</span>
              <TokenValue>{value}</TokenValue>
            </Breakpoint>
          ))}
        </BreakpointList>
        <Hint aria-live='polite'>
          {activeBreakpoint
            ? `You are viewing this page at the ${activeBreakpoint} breakpoint. Resize the window to see it change.`
            : 'Below the smallest breakpoint.'}
        </Hint>
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

const Group = styled.section`
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

const TokenLabel = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-main);
`

const TokenValue = styled.code`
  font-size: 0.85rem;
  color: var(--text-main);
`

const TokenName = styled.code`
  font-size: 0.8rem;
  color: var(--primary-green-dark);
  opacity: 0.8;
`

const Swatches = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-sm);

  @media ${devices.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  li {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
`

const Swatch = styled.div`
  height: 64px;
  border-radius: 6px;
  border: 1px solid var(--gray-200);
  margin-bottom: 0.35rem;
`

const TypeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);

  li {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }
`

const SpacingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);

  li {
    display: grid;
    grid-template-columns: 6rem auto 1fr;
    align-items: center;
    gap: var(--gap-sm);
  }
`

const SpacingBar = styled.div`
  height: 1rem;
  border-radius: 2px;
  background: var(--accent-orange);
`

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-xs) var(--gap-sm);
`

const BreakpointList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-xs);
`

const Breakpoint = styled.li`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--primary-green-dark);
  font-size: 0.9rem;
  background: ${({ $active }) =>
    $active ? 'var(--primary-green-dark)' : 'var(--background-light)'};
  color: ${({ $active }) =>
    $active ? 'var(--text-light)' : 'var(--primary-green-dark)'};

  code {
    color: inherit;
  }
`

const Hint = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: var(--text-main);
`
