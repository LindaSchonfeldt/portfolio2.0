import styled from 'styled-components'

import devices from '../styles/devices'

const SectionContainer = styled.div`
  width: 100%;
  padding: var(--section-padding);
  box-sizing: border-box;

  @media ${devices.tablet} {
    /* Tablet-specific styling - padding is handled via CSS variables */
  }

  @media ${devices.laptop} {
    /* Laptop-specific styling */
    max-width: 1200px;
    margin: 0 auto;
  }

  @media ${devices.desktop} {
    /* Desktop-specific styling */
    max-width: 1400px;
  }
`

export default SectionContainer
