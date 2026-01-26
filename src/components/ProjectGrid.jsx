import styled from 'styled-components'
import devices from '../styles/devices'

export const ProjectGrid = styled.div`
  /* Mobile: Simple flex column layout */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
  max-width: 1600px;
  width: 100%;

  /* Tablet and up: Grid layout */
  @media ${devices.tablet} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    justify-items: stretch;
    align-items: start;
    grid-auto-flow: dense;
  }
`
