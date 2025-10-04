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
    margin: 0 0.5rem;
  }

  @media ${devices.desktop} {
    margin: 0 1rem;
  }
`

export default SectionContainer
