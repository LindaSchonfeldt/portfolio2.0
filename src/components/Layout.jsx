import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import devices from '../styles/devices'
import { HamburgerMenu } from './HamburgerMenu'
import { Nav } from './Nav'

export const Layout = () => {
  return (
    <LayoutWrapper>
      <Nav />
      <HamburgerMenu />
      <Main>
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

const Main = styled.main`
  display: flex;
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
