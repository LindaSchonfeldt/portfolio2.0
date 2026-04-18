import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import devices from '../styles/devices'
import { preloadProjectImages } from '../utils/preloadImages'
import { useRoutePreloader } from '../utils/routePreloader'
import { Logo } from './Logo'

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const { preloadOnHover } = useRoutePreloader()

  return (
    <NavContainer $scrolled={scrolled}>
      <LogoLink to='/'>
        <Logo size='small' alt='Linda Schönfeldt' />
        <LogoName>Linda Schönfeldt</LogoName>
      </LogoLink>
      <NavLinks>
        <NavItem>
          <StyledNavLink to='/' {...preloadOnHover('home')}>
            <TextLabel>About</TextLabel>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink
            to='/projects'
            onMouseEnter={preloadProjectImages}
            {...preloadOnHover('projects')}
          >
            <TextLabel>Projects</TextLabel>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to='/contact' {...preloadOnHover('contact')}>
            <TextLabel>Contact</TextLabel>
          </StyledNavLink>
        </NavItem>
      </NavLinks>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  display: none;

  @media ${devices.laptop} {
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 0 4rem 0 6rem;
    z-index: 1000;
    transition:
      background 0.3s ease,
      backdrop-filter 0.3s ease;

    ${({ $scrolled }) =>
      $scrolled &&
      `
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    `}
  }

  @media ${devices.desktop} {
    padding: 0 10rem 0 12rem;
  }
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  gap: 0.6rem;
  flex-shrink: 0;
  padding: 1rem 0;
  text-decoration: none;
`

const LogoName = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--primary-green-dark);
  letter-spacing: 0.02em;
  white-space: nowrap;
  line-height: 1;
`

const NavLinks = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  list-style: none;
`

const NavItem = styled.li`
  position: relative;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--primary-green-dark);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    gap: 0.75rem;
  }

  &.active {
    gap: 0.75rem;
  }

  ${(props) =>
    props.$expanded &&
    `
    width: 120px;
  `}

  @media ${devices.desktop} {
    width: 110px;

    &:hover {
      width: 120px;
    }

    &.active {
      width: 110px;
    }

    ${(props) =>
      props.$expanded &&
      `
      width: 110px;
    `}
  }

  @media ${devices.laptopL} {
    width: 110px;

    &:hover {
      width: 120px;
    }

    &.active {
      width: 110px;
    }

    ${(props) =>
      props.$expanded &&
      `
      width: 110px;
    `}
  }
`
