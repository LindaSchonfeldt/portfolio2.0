import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring
} from 'framer-motion'
import { useId, useLayoutEffect, useRef, useState } from 'react'
import {
  FaBriefcase,
  FaChevronDown,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaSeedling
} from 'react-icons/fa'
import { LuDownload } from 'react-icons/lu'
import styled from 'styled-components'

import { Button } from '../components'
import { cvPdf, timeline } from '../data/cv'
import devices from '../styles/devices'
import { focusStyles } from '../styles/mixins'

const typeIcons = {
  work: FaBriefcase,
  education: FaGraduationCap,
  volunteer: FaHandHoldingHeart,
  other: FaSeedling
}

// Winding trail through the icon centers: an S-curve between each pair,
// plus a lead-in from the top and a tail out to the bottom of the list
const buildTrailPath = (points, height) => {
  if (points.length === 0) return ''

  const first = points[0]
  const last = points[points.length - 1]
  const start = { x: points[1]?.x ?? first.x, y: 0 }
  const end = { x: points[points.length - 2]?.x ?? last.x, y: height }

  const curve = (a, b) => {
    const dy = (b.y - a.y) * 0.55
    return `C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`
  }

  return [
    `M ${start.x} ${start.y}`,
    ...[start, ...points].slice(0, -1).map((a, i) => curve(a, points[i])),
    curve(last, end)
  ].join(' ')
}

export const Experience = () => {
  const [openId, setOpenId] = useState(timeline[0]?.id)
  const [trail, setTrail] = useState({ width: 0, height: 0, d: '' })
  const listRef = useRef(null)
  const iconRefs = useRef([])
  const maskId = useId()
  const reduceMotion = useReducedMotion()

  // Re-measure icon positions whenever the list resizes (expanding cards,
  // window resizes). offset* ignores transforms, so entrance animations
  // don't skew the measurement.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      const points = iconRefs.current.filter(Boolean).map((icon) => ({
        x:
          icon.offsetParent.offsetLeft + icon.offsetLeft + icon.offsetWidth / 2,
        y: icon.offsetParent.offsetTop + icon.offsetTop + icon.offsetHeight / 2
      }))
      setTrail({
        width: list.offsetWidth,
        height: list.offsetHeight,
        d: buildTrailPath(points, list.offsetHeight)
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  // Draw the timeline line as the list scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 80%', 'end 60%']
  })
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30
  })

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
        <Trail
          aria-hidden='true'
          width={trail.width}
          height={trail.height}
          viewBox={`0 0 ${trail.width} ${trail.height}`}
        >
          <defs>
            <mask
              id={maskId}
              maskUnits='userSpaceOnUse'
              x='-20'
              y='-20'
              width={trail.width + 40}
              height={trail.height + 40}
            >
              <motion.path
                d={trail.d}
                fill='none'
                stroke='white'
                strokeWidth='10'
                style={{ pathLength: reduceMotion ? 1 : lineProgress }}
              />
            </mask>
          </defs>
          <TrailGround d={trail.d} />
          <TrailSteps d={trail.d} mask={`url(#${maskId})`} />
        </Trail>

        {timeline.map((entry, index) => {
          const Icon = typeIcons[entry.type] ?? FaBriefcase
          const isOpen = openId === entry.id
          const detailsId = `cv-details-${entry.id}`

          return (
            <TimelineItem
              key={entry.id}
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <TimelineIcon
                ref={(el) => (iconRefs.current[index] = el)}
                $active={isOpen}
                $offset={index % 2 === 1}
              >
                <Icon aria-hidden='true' />
              </TimelineIcon>

              <TimelineCard $active={isOpen}>
                <ToggleButton
                  type='button'
                  aria-expanded={isOpen}
                  aria-controls={detailsId}
                  onClick={() => toggle(entry.id)}
                >
                  <span>
                    <TimelinePeriod>{entry.period}</TimelinePeriod>
                    <TimelineTitle>
                      {entry.role}
                      {entry.employmentType && `, ${entry.employmentType}`}
                    </TimelineTitle>
                    <TimelineInstitution>
                      {entry.organization}
                      {entry.location && ` · ${entry.location}`}
                    </TimelineInstitution>
                  </span>
                  <Chevron $open={isOpen} aria-hidden='true' />
                </ToggleButton>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <Details
                      id={detailsId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <DetailsInner>
                        {entry.highlights ? (
                          <Highlights>
                            {entry.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </Highlights>
                        ) : (
                          <TimelineDescription>
                            {entry.description}
                          </TimelineDescription>
                        )}

                        {entry.tech.length > 0 && (
                          <TechList aria-label='Tools and methods'>
                            {entry.tech.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </TechList>
                        )}
                      </DetailsInner>
                    </Details>
                  )}
                </AnimatePresence>
              </TimelineCard>
            </TimelineItem>
          )
        })}
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

const Trail = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  pointer-events: none;
`

// The worn ground of the path
const TrailGround = styled.path`
  fill: none;
  stroke: var(--primary-green);
  stroke-width: 12;
  stroke-linecap: round;
  opacity: 0.5;
`

// Footsteps along the path, revealed by the scroll-driven mask
const TrailSteps = styled.path`
  fill: none;
  stroke: var(--primary-green-dark);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 6 9;
`

const TimelineItem = styled(motion.li)`
  position: relative;
  margin-bottom: 2rem;
  padding-left: 3.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media ${devices.tablet} {
    padding-left: 6rem;
  }
`

const TimelineIcon = styled.div`
  position: absolute;
  z-index: 1;
  left: ${({ $offset }) => ($offset ? '14px' : '0')};
  top: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--primary-green-dark);
  background: ${({ $active }) =>
    $active ? 'var(--primary-green-dark)' : 'var(--background-light)'};
  color: ${({ $active }) =>
    $active ? 'var(--text-light)' : 'var(--primary-green-dark)'};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  @media ${devices.tablet} {
    left: ${({ $offset }) => ($offset ? '44px' : '0')};
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
`

const TimelineCard = styled.div`
  position: relative;
  background: var(--background-light);
  border-radius: 4px;
  border: 2px solid
    ${({ $active }) =>
      $active ? 'var(--primary-green-dark)' : 'var(--primary-green)'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease;
`

const ToggleButton = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.2rem;
  background: none;
  border: none;
  text-align: left;
  color: inherit;
  cursor: pointer;
  ${focusStyles}

  &:hover h3 {
    color: var(--primary-green-dark);
  }
`

const Chevron = styled(FaChevronDown)`
  flex-shrink: 0;
  margin-top: 0.4rem;
  color: var(--primary-green-dark);
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const TimelinePeriod = styled.span`
  display: block;
  font-family: 'Raleway', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-green-dark);
  margin-bottom: 0.2rem;
`

const TimelineTitle = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-main);
`

const TimelineInstitution = styled.span`
  display: block;
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-main);
  opacity: 0.8;
`

const Details = styled(motion.div)`
  overflow: hidden;
`

const DetailsInner = styled.div`
  padding: 0 1.2rem 1.2rem;
`

const Highlights = styled.ul`
  margin: 0 0 1rem;
  padding-left: 1.2rem;

  li {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 0.4rem;
  }
`

const TimelineDescription = styled.p`
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
`

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: var(--background-green);
    color: var(--primary-green-dark);
  }
`
