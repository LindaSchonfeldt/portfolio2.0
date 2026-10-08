import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  FaBriefcase,
  FaChevronDown,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaSeedling
} from 'react-icons/fa'
import styled from 'styled-components'

import devices from '../../styles/devices'
import { focusStyles } from '../../styles/mixins'
import { EntryDetails } from './EntryDetails'

const typeIcons = {
  work: FaBriefcase,
  education: FaGraduationCap,
  volunteer: FaHandHoldingHeart,
  other: FaSeedling
}

// trailIndex counts main-trail entries only, so the zigzag keeps its rhythm
// past side entries
export const TimelineEntry = ({
  entry,
  trailIndex,
  isOpen,
  onToggle,
  iconRef
}) => {
  const reduceMotion = useReducedMotion()
  const Icon = typeIcons[entry.type] ?? FaBriefcase
  const detailsId = `cv-details-${entry.id}`

  return (
    <TimelineItem
      $branch={entry.branch}
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <TimelineIcon
        ref={iconRef}
        data-branch={Boolean(entry.branch)}
        $active={isOpen}
        $branch={entry.branch}
        $offset={trailIndex % 2 === 1}
      >
        <Icon aria-hidden='true' />
      </TimelineIcon>

      <TimelineCard $active={isOpen}>
        <ToggleButton
          type='button'
          aria-expanded={isOpen}
          aria-controls={detailsId}
          onClick={onToggle}
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
              exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <EntryDetails entry={entry} />
            </Details>
          )}
        </AnimatePresence>
      </TimelineCard>
    </TimelineItem>
  )
}

// Side entries (branch) are pushed right, off the main trail
const TimelineItem = styled(motion.li)`
  position: relative;
  margin-bottom: 2rem;
  padding-left: ${({ $branch }) => ($branch ? '6rem' : '3.5rem')};

  &:last-child {
    margin-bottom: 0;
  }

  @media ${devices.tablet} {
    padding-left: ${({ $branch }) => ($branch ? '9rem' : '6rem')};
  }
`

const iconLeft = ({ $branch, $offset }, branchLeft, offsetLeft) =>
  $branch ? branchLeft : $offset ? offsetLeft : '0'

const TimelineIcon = styled.div`
  position: absolute;
  z-index: 1;
  left: ${(props) => iconLeft(props, '48px', '14px')};
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
    left: ${(props) => iconLeft(props, '92px', '44px')};
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
