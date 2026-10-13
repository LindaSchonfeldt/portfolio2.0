import { useEffect, useId, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import projectsData from '../../data/projects.json'
import devices from '../../styles/devices'
import { getProjectActions } from '../../utils/projectActions'
import { ProjectCard } from '../ProjectCard'

// This portfolio's own entry, so the preview is the card the site renders for it
const baseProject = projectsData.projects.find((p) => p.slug === 'portfolio')

const sizes = ['small', 'medium', 'large', 'x-large']

// Optional fields: each one that is set becomes a button or badge on the card
const toggles = [
  { key: 'github', label: 'GitHub', value: baseProject?.github || 'https://github.com/…' },
  { key: 'netlify', label: 'Live site', value: 'https://lindaschonfeldt.com' },
  { key: 'prototype', label: 'Prototype', value: 'https://figma.com/…' },
  { key: 'hasDetail', label: 'Case study', value: true }
]

// Wait for the last change before announcing, so quickly arrowing through
// the sizes gives one announcement instead of a queue of them
const ANNOUNCE_DELAY_MS = 500

// Long text is shortened in the code view only, the card gets the full value
const shorten = (value) =>
  typeof value === 'string' && value.length > 60
    ? `${value.slice(0, 57)}…`
    : value

// The entry exactly as it would be written in projects.json
const buildEntry = (size, enabled) => ({
  title: baseProject.title,
  image: baseProject.image,
  description: baseProject.description,
  categories: baseProject.categories,
  size,
  ...Object.fromEntries(
    toggles.filter((t) => enabled[t.key]).map((t) => [t.key, t.value])
  )
})

// Fields left out of the entry are cleared, so the card only shows what is set
const buildCard = (entry) => ({
  ...baseProject,
  github: '',
  netlify: '',
  prototype: '',
  hasDetail: false,
  ...entry
})

// Built from the same helper ProjectCard uses, so it always matches the card
const describeCard = (card) => {
  const buttons = getProjectActions(card).map((action) => action.label)
  if (card.hasDetail) buttons.push('Case Study')

  const list = buttons.length
    ? `with ${new Intl.ListFormat('en').format(buttons)} ${buttons.length === 1 ? 'button' : 'buttons'}`
    : 'with no buttons'
  return `Card updated: ${card.size} size, ${list}.`
}

export function ContentAsDataShowcase() {
  const id = useId()
  // Start from the entry as it is in the data
  const [size, setSize] = useState(baseProject?.size || 'medium')
  const [enabled, setEnabled] = useState(() =>
    Object.fromEntries(toggles.map((t) => [t.key, Boolean(baseProject?.[t.key])]))
  )
  const [lastChanged, setLastChanged] = useState(null)
  const [announcement, setAnnouncement] = useState('')

  // The preview is inert and hidden from screen readers, so describe the
  // card in a live region instead. Nothing is announced until the first change
  useEffect(() => {
    if (!baseProject || lastChanged === null) return
    const timer = setTimeout(
      () => setAnnouncement(describeCard(buildCard(buildEntry(size, enabled)))),
      ANNOUNCE_DELAY_MS
    )
    return () => clearTimeout(timer)
  }, [size, enabled, lastChanged])

  if (!baseProject) return null

  const toggle = (key) => {
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }))
    setLastChanged(key)
  }

  const changeSize = (next) => {
    setSize(next)
    setLastChanged('size')
  }

  const entry = buildEntry(size, enabled)
  const card = buildCard(entry)

  return (
    <Showcase>
      <Controls>
        <Fieldset>
          <legend>size</legend>
          <Options>
            {sizes.map((option) => (
              <Option key={option}>
                <input
                  type='radio'
                  name={`${id}-size`}
                  value={option}
                  checked={size === option}
                  onChange={() => changeSize(option)}
                />
                <span>{option}</span>
              </Option>
            ))}
          </Options>
          {/* For sighted keyboard users. Screen readers already explain
              radio groups, so it is hidden from them */}
          <ArrowHint aria-hidden='true'>Use arrow keys to switch size</ArrowHint>
          <MobileNote>
            On a phone every card is full width with the image above the text,
            so the sizes look the same here. On a tablet or desktop, sizes
            change the width and some place the image beside the text.
          </MobileNote>
        </Fieldset>

        <Fieldset>
          <legend>Optional fields</legend>
          <Options>
            {toggles.map(({ key, label }) => (
              <Option key={key}>
                <input
                  type='checkbox'
                  checked={Boolean(enabled[key])}
                  onChange={() => toggle(key)}
                />
                <span>{label}</span>
              </Option>
            ))}
          </Options>
        </Fieldset>
      </Controls>

      <Code aria-label='Project entry in projects.json'>
        <code>
          {'{\n'}
          {Object.entries(entry).map(([key, value], index, all) => (
            <Line
              // Remount the changed line so its highlight replays
              key={key === lastChanged ? `${key}-${JSON.stringify(value)}` : key}
              $changed={key === lastChanged}
            >
              {'  '}
              <Key>"{key}"</Key>
              {': '}
              <Value>{JSON.stringify(shorten(value))}</Value>
              {index < all.length - 1 ? ',' : ''}
              {'\n'}
            </Line>
          ))}
          {'}'}
        </code>
      </Code>

      <PreviewLabel>Rendered by ProjectCard</PreviewLabel>
      {/* Preview only: inert keeps its links from leaving the case study */}
      <Preview $wide={size === 'large' || size === 'x-large'} inert=''>
        <ProjectCard project={card} size={size} showCurrentBadge={false} />
      </Preview>

      <div className='visually-hidden' aria-live='polite'>
        {announcement}
      </div>
    </Showcase>
  )
}

const Showcase = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
  margin-top: var(--gap-md);
  padding: var(--gap-sm);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  background: var(--gray-100);

  @media ${devices.tablet} {
    padding: var(--gap-md);
  }
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);

  @media ${devices.tablet} {
    flex-direction: row;
    gap: var(--gap-md);
  }
`

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;

  legend {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--primary-green-dark);
    margin-bottom: var(--gap-xs);
  }
`

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-xs);
`

const Option = styled.label`
  position: relative;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    inset: 0;
    margin: 0;
    cursor: pointer;
  }

  span {
    display: inline-block;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--primary-green-dark);
    border-radius: 6px;
    font-family: 'Raleway', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--primary-green-dark);
    background: var(--background-light);
  }

  input:checked + span {
    background: var(--primary-green-dark);
    color: var(--text-light);
  }

  input:focus-visible + span {
    outline: 2px solid var(--accent-orange);
    outline-offset: 2px;
  }
`

// Space is always reserved, so showing the hint never shifts the layout.
// Phones rarely have a keyboard to arrow with, so it is left out there
const ArrowHint = styled.p`
  display: none;
  margin: var(--gap-xs) 0 0;
  font-size: 0.8rem;
  color: var(--text-main);
  visibility: hidden;

  @media ${devices.tablet} {
    display: block;
  }

  fieldset:has(input:focus-visible) & {
    visibility: visible;
  }
`

// The size layouts only kick in from tablet width, so explain the lack of
// change on narrow screens and hide the note where the difference is visible
const MobileNote = styled.p`
  margin: var(--gap-xs) 0 0;
  font-size: 0.8rem;
  color: var(--text-main);

  @media ${devices.tablet} {
    display: none;
  }
`

const Code = styled.pre`
  margin: 0;
  padding: var(--gap-sm);
  border-radius: 6px;
  background: var(--background-dark);
  color: var(--text-light);
  font-size: 0.85rem;
  line-height: 1.6;
  overflow-x: auto;
`

const highlight = keyframes`
  from {
    background: rgba(255, 153, 0, 0.35);
  }
  to {
    background: transparent;
  }
`

const Line = styled.span`
  display: block;
  margin: 0 calc(-1 * var(--gap-sm));
  padding: 0 var(--gap-sm);
  white-space: pre;

  ${({ $changed }) =>
    $changed &&
    css`
      animation: ${highlight} 1.2s ease-out;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`

const Key = styled.span`
  color: var(--primary-green);
`

const Value = styled.span`
  color: var(--accent-orange);
`

const PreviewLabel = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary-green-dark);
  margin: var(--gap-xs) 0 0;
`

// Small and medium cards take one grid column on the Projects page,
// so the preview keeps them at that width
const Preview = styled.div`
  width: 100%;
  max-width: ${({ $wide }) => ($wide ? '100%' : '420px')};
  pointer-events: none;
`
