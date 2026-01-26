import styled from 'styled-components'

import devices from '../styles/devices'

const SectionContainer = styled.div`
  width: 100%;
  padding: 4rem 1rem;
  box-sizing: border-box;

  @media ${devices.tablet} {
    padding: 4rem 1.5rem;
  }

  @media ${devices.laptop} {
    padding: 4rem 6rem 4rem 6rem;
    padding-right: 4rem;
  }

  @media ${devices.desktop} {
    padding: 6rem 12rem 6rem 12rem;
    padding-right: 10rem;
  }
`

export default SectionContainer
