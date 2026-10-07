import { useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import styled from 'styled-components'

import { Button } from '../../components'
import { cvPdf, timeline } from '../../data/cv'
import devices from '../../styles/devices'
import { TimelineEntry } from './TimelineEntry'
import { TimelineTrail } from './TimelineTrail'
import { useTrailPath } from './useTrailPath'

export const Experience = () => {
  const [openId, setOpenId] = useState(timeline[0]?.id)
  const { listRef, registerIcon, trail, progress } = useTrailPath()

  const toggle = (id) => setOpenId((current) => (current === id ? null : id))

  return (
    <ExperienceContent>
      <Header>
        <h2>Experience & Education</h2>
        <DownloadButton
          label='Download CV (PDF)'
          icon={LuDownload}
          url={cvPdf}
          variant='icon'
          iconOnly
        />
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;

  h2 {
    margin: 0;
  }
`

// Icon follows the h2 font sizes in styles/typography.js
const DownloadButton = styled(Button)`
  && {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;

    @media ${devices.tablet} {
      font-size: 1.75rem;
    }

    @media ${devices.laptop} {
      font-size: 2.5rem;
    }
  }
`

const Timeline = styled.ol`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
`
