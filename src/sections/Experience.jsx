import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import styled from 'styled-components'

import SectionContainer from '../components/SectionContainer'
import devices from '../styles/devices'

export const Experience = () => {
  // Create a ref for the section
  const sectionRef = useRef(null)

  // Check if section is in view (with some margin to trigger slightly before it's fully visible)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <SectionContainer id='experience' ref={sectionRef}>
      <ExperienceContent
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2>Experience & Education</h2>

        <Timeline>
          <TimelineItem
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TimelineIcon>
              <FaBriefcase />
            </TimelineIcon>
            <TimelineContent>
              <TimelinePeriod>Nov 2024 - Present</TimelinePeriod>
              <TimelineTitle>UX/UI Designer / Frontend Developer</TimelineTitle>
              <TimelineInstitution>Sampler</TimelineInstitution>
              <TimelineDescription>
                Designing and developing a marketing game and a client-facing
                web portal. Working with React and modern JavaScript to create
                engaging user experiences that connect brands with consumers
                through gamified sampling.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TimelineIcon>
              <FaBriefcase />
            </TimelineIcon>
            <TimelineContent>
              <TimelinePeriod>Sept - Oct 2025</TimelinePeriod>
              <TimelineTitle>Frontend Developer Intern</TimelineTitle>
              <TimelineInstitution>FIXMEAPP</TimelineInstitution>
              <TimelineDescription>
                Contributing to the development of a web app that simplifies
                digital booking experiences. Building scalable, accessible
                front-end components in React and TailwindCSS while
                collaborating closely with the rest of the team.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TimelineIcon>
              <FaGraduationCap />
            </TimelineIcon>
            <TimelineContent>
              <TimelinePeriod>Jan - Oct 2025</TimelinePeriod>
              <TimelineTitle>JavaScript Bootcamp</TimelineTitle>
              <TimelineInstitution>Technigo</TimelineInstitution>
              <TimelineDescription>
                Intensive 32-week bootcamp focused on modern web development
                technologies. Built multiple projects using React, Node.js, and
                other frontend technologies.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TimelineIcon>
              <FaBriefcase />
            </TimelineIcon>
            <TimelineContent>
              <TimelinePeriod>Nov 2023 - May 2024</TimelinePeriod>
              <TimelineTitle>UX Designer Intern</TimelineTitle>
              <TimelineInstitution>Univid</TimelineInstitution>
              <TimelineDescription>
                Worked on UX design for a B2B SaaS webinar platform. Designed
                user-centered prototypes, iterated on mockups, and collaborated
                with developers and stakeholders to align design with business
                goals.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TimelineIcon>
              <FaGraduationCap />
            </TimelineIcon>
            <TimelineContent>
              <TimelinePeriod>Aug 2021 - June 2024</TimelinePeriod>
              <TimelineTitle>
                Bachelor's Degree in Interaction Design
              </TimelineTitle>
              <TimelineInstitution>Stockholm University</TimelineInstitution>
              <TimelineDescription>
                Studied the principles of human-computer interaction, user
                research methods, and the design of digital products and
                services.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </ExperienceContent>
    </SectionContainer>
  )
}

const ExperienceContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;

  h2 {
    margin-bottom: 2rem;
    color: var(--primary-green-dark);
  }
`

const Timeline = styled.div`
  position: relative;
  width: 100%;
  margin: 0 0 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 15px;
    height: 100%;
    width: 3px;
    background: var(--primary-green-dark);
    opacity: 0.3;
  }

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 11.5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid var(--primary-green-dark);
    opacity: 0.3;
  }

  @media ${devices.tablet} {
    &::before {
      left: 20px;
    }

    &::after {
      left: 16.5px;
    }
  }
`

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media ${devices.tablet} {
    padding-left: 4rem;
  }
`

const TimelineIcon = styled.div`
  position: absolute;
  left: 0;
  top: 20%;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-green-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  @media ${devices.tablet} {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
`

const TimelineContent = styled.div`
  position: relative;
  padding: 1.2rem;
  background: var(--background-light);
  border-radius: 4px;
  border: 2px solid var(--primary-green);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const TimelinePeriod = styled.span`
  display: inline-block;
  font-family: 'Raleway', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-green-dark);
  margin-bottom: 0.2rem;
`

const TimelineTitle = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main);
`

const TimelineInstitution = styled.h4`
  margin: 0 0 0.5rem 0;
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-main);
  opacity: 0.8;
`

const TimelineDescription = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-main);
  opacity: 0.85;
`
