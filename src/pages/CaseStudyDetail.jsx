import styled from 'styled-components'
import { motion } from 'framer-motion'
import CaseStudyPage from './CaseStudyPage'
import { CaseInsight } from '../components/case study/CaseInsight'
import SectionContainer from '../components/SectionContainer'
import { fullBleed } from '../styles/spacing'

// Example case studies data - you can import from your caseStudies.json
const samplerReviewCase = {
  title: 'GoFish – Low-friction Product Reviews',
  subtitle: 'Designing a swipe-based review flow to reduce user effort',
  role: 'UX Designer & Frontend Developer',
  timeline: '2 weeks',
  tools: ['Figma', 'React', 'UX Research'],
  heroImage: '/path-to-hero-image',

  sections: [
    {
      eyebrow: 'Problem',
      title: 'Review fatigue reduces completion rates',
      body: [
        'Traditional review forms require too much effort for low-stakes feedback.',
        'Users often abandon reviews before completion.'
      ]
    },
    {
      eyebrow: 'Goal',
      title: 'Make feedback fast, intuitive, and rewarding',
      body: [
        'Reduce friction by replacing form-based reviews with swipe gestures.',
        'Maintain clarity without increasing cognitive load.'
      ]
    },
    {
      eyebrow: 'Solution',
      title: 'Swipe-based review cards',
      body: [
        'Each card represents a single statement.',
        'Users swipe left or right to respond.'
      ],
      embed: 'https://www.figma.com/embed?embed_host=share&url=YOUR_PROTO_LINK'
    },
    {
      eyebrow: 'Constraints',
      title: "Working within Figma's interaction model",
      body: [
        'Gesture intent and navigation were handled within a single drag interaction.',
        "This ensured reliable motion while respecting Figma's limitations."
      ]
    },
    {
      eyebrow: 'Outcome',
      title: 'Clear feedback with minimal effort',
      body: [
        'The flow reduces decision fatigue.',
        'Users always know how many steps remain.'
      ]
    }
  ]
}

export default function CaseStudyDetail() {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionContainer>
        <CaseStudyPage {...samplerReviewCase} />

        <CaseInsight>
          Swipe gestures reduce friction, but must be paired with clear
          affordances for first-time users.
        </CaseInsight>
      </SectionContainer>
    </PageContainer>
  )
}

const PageContainer = styled(motion.div)`
  ${fullBleed}
  background: var(--background-light);
  padding: var(--section-padding);
  min-height: 100vh;
`
