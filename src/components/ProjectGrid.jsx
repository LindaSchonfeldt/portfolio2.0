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

  /* Tablet: 2 column grid */
  @media ${devices.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    justify-items: stretch;
    align-items: start;
    grid-auto-flow: dense;
  }

  /* Laptop and up: Flexible grid with larger minimum */
  @media ${devices.laptop} {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }
`
