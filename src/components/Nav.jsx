import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import devices from '../styles/devices'

export const Nav = () => {
  return (
    <NavContainer>
      <NavLinks>
        <NavItem>
          <StyledNavLink to='/' $primary>
            About
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to='/projects' $primary>
            Projects
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to='/contact' $primary>
            Contact
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
    flex-direction: column;
    position: fixed;
    top: 20%;
    right: 0;
    transform: translateY(-50%);
    z-index: 1000;
  }
`

const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
`

const NavItem = styled.li`
  position: relative;
  width: 100%;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: var(--accent-orange);
  color: white;
  font-weight: 500;
  padding: 1rem;
  width: 100px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--accent-orange);
    transform: translateX(-5px);
  }

  &.active {
    background-color: var(--accent-orange);
  }
`
