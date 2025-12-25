import styled from 'styled-components'
import { SkillSection } from '../SkillSection'
import { SkillSectionTimeline, SkillSectionMasonry, SkillSectionCarousel } from './SkillSectionExamples'
import { SkillSectionMasonryHorizontal } from './SkillSectionMasonryHorizontal'
import { SkillSectionHorizontalCards } from './SkillSectionHorizontalCards'
import { SkillSectionSharp } from './SkillSectionSharp'

/**
 * Demo page showing all skill section variations
 * Use this to compare different layouts and choose your favorite
 */
export const SkillSectionDemo = () => {
  return (
    <DemoContainer>
      <DemoSection>
        <SectionLabel>
          <h2>1. Enhanced Current Design</h2>
          <p>Clean cards with animated icons & staggered entrance</p>
        </SectionLabel>
        <SkillSection />
      </DemoSection>

      <Divider />

      <DemoSection>
        <SectionLabel>
          <h2>2. Sharp Clean Design (Projects Style)</h2>
          <p>No rounded corners, black rectangular tags, clean white cards - matches Projects page</p>
        </SectionLabel>
        <SkillSectionSharp />
      </DemoSection>

      <Divider />

      <DemoSection>
        <SectionLabel>
          <h2>3. Timeline Layout</h2>
          <p>Vertical timeline with connecting line & tag-style skills</p>
        </SectionLabel>
        <SkillSectionTimeline />
      </DemoSection>

      <Divider />

      <DemoSection>
        <SectionLabel>
          <h2>4. Masonry Grid (Centered Cards)</h2>
          <p>Multi-column masonry grid with centered icons and horizontal skill tags</p>
        </SectionLabel>
        <SkillSectionHorizontalCards />
      </DemoSection>

      <Divider />

      <DemoSection>
        <SectionLabel>
          <h2>5. Masonry Grid with Horizontal Tags</h2>
          <p>Skills flow horizontally like badges, cards adapt to content height</p>
        </SectionLabel>
        <SkillSectionMasonryHorizontal />
      </DemoSection>

      <Divider />

      <DemoSection>
        <SectionLabel>
          <h2>6. Masonry/Bento Grid (Vertical Lists)</h2>
          <p>Pinterest-style staggered grid with vertical skill lists</p>
        </SectionLabel>
        <SkillSectionMasonry />
      </DemoSection>

      <Divider />

      <DemoSection>
        <SectionLabel>
          <h2>7. Horizontal Carousel Layout</h2>
          <p>Swipeable cards with scroll-snap (try scrolling horizontally)</p>
        </SectionLabel>
        <SkillSectionCarousel />
      </DemoSection>

      <Footer>
        <p>Scroll through all examples to compare layouts</p>
        <p>Once you pick your favorite, update your main app to use it!</p>
      </Footer>
    </DemoContainer>
  )
}

const DemoContainer = styled.div`
  width: 100%;
  background: linear-gradient(to bottom, #f5f5f5 0%, #e0e0e0 100%);
  min-height: 100vh;
`

const DemoSection = styled.div`
  position: relative;
  padding: 2rem 0;
`

const SectionLabel = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 3px solid var(--accent-orange, #ff9900);

  h2 {
    margin: 0 0 0.5rem 0;
    color: #2c3e2f;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 1rem;
    font-family: 'Raleway', sans-serif;
  }
`

const Divider = styled.div`
  height: 4px;
  background: linear-gradient(to right, transparent, var(--accent-orange, #ff9900), transparent);
  margin: 3rem 0;
`

const Footer = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: white;

  p {
    margin: 0.5rem 0;
    color: #666;
    font-family: 'Raleway', sans-serif;

    &:first-child {
      font-weight: 600;
      font-size: 1.1rem;
      color: #2c3e2f;
    }
  }
`

export default SkillSectionDemo
