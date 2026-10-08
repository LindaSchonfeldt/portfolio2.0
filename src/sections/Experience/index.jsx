import { useState } from 'react'
import styled from 'styled-components'

import { Button } from '../../components'
import { cvPdf, timeline } from '../../data/cv'
import { TimelineEntry } from './TimelineEntry'
import { TimelineTrail } from './TimelineTrail'
import { useTrailPath } from './useTrailPath'

export const Experience = () => {
  // Timeline runs oldest first, so open the most recent entry
  const [openId, setOpenId] = useState(timeline.at(-1)?.id)
  const { listRef, registerIcon, trail, progress } = useTrailPath()

  const toggle = (id) => setOpenId((current) => (current === id ? null : id))

  return (
    <ExperienceContent>
      <Header>
        <h2>Experience & Education</h2>
        {/* PDF links get a download icon from Button automatically */}
        <DownloadButton label='Download CV' url={cvPdf} variant='secondary' />
      </Header>

      <Timeline ref={listRef}>
        <TimelineTrail trail={trail} progress={progress} />

        {timeline.map((entry, index) => (
          <TimelineEntry
            key={entry.id}
            entry={entry}
            index={index}
            isOpen={openId === entry.id}
            onToggle={() => toggle(entry.id)}
            iconRef={registerIcon(index)}
          />
        ))}
      </Timeline>
    </ExperienceContent>
  )
}

const ExperienceContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2.5rem;

  h2 {
    margin: 0;
  }
`

// Sized to its label instead of the full-width button default
const DownloadButton = styled(Button)`
  && {
    width: auto;
    margin: 0;
  }
`

// Vertical padding gives the trail room to lead in and out, where the
// start and end scenes sit. The top margin leaves room for the forest,
// which rises above the trail's starting point.
const Timeline = styled.ol`
  position: relative;
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 3rem 0;
`
