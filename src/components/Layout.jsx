import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import devices from '../styles/devices'
import { HamburgerMenu } from './HamburgerMenu'
import { Nav } from './Nav'

export const Layout = () => {
  return (
    <LayoutWrapper>
      <SkipLink href='#main'>Skip to content</SkipLink>
      <Nav />
      <HamburgerMenu />
      {/* tabIndex -1 lets the skip link move focus here, not just scroll */}
      <Main id='main' tabIndex={-1}>
        <Outlet />
      </Main>
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`

/* Hidden until focused with Tab, then shown above the nav */
const SkipLink = styled.a`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 2000;
  padding: 0.75rem 1rem;
  background: var(--primary-green-dark);
  color: var(--text-light);
  font-weight: 600;
  text-decoration: none;
  transform: translateY(-200%);

  &:focus-visible {
    transform: translateY(0);
  }
`

const Main = styled.main`
  display: flex;

  /* Focus lands here from the skip link; the ring would frame the whole page */
  &:focus {
    outline: none;
  }
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  /* Each section has its own padding through SectionContainer */

  @media ${devices.tablet} {
    /* Tablet-specific layout adjustments */
    max-width: 100%;
  }

  @media ${devices.laptop} {
    /* Laptop-specific layout adjustments */
    max-width: 100%;
    // margin: 0 auto;
  }

  @media ${devices.desktop} {
    /* Desktop-specific layout adjustments */
    max-width: 100%;
  }
`
