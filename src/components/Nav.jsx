import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Nav = () => {
  return (
    <NavContainer>
      <NavLinks>
        <NavItem>
          <StyledNavLink to='/' end>
            Home
          </StyledNavLink>
        </NavItem>
      </NavLinks>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.95);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;

  a {
    text-decoration: none;
    color: var(--primary-green-dark, #2c3e2f);
  }
`

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
`

const NavItem = styled.li`
  position: relative;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--text-main, #333);
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-green-dark, #2c3e2f);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--primary-green-dark, #2c3e2f);

    &::after {
      width: 100%;
    }
  }

  &.active {
    color: var(--primary-green-dark, #2c3e2f);

    &::after {
      width: 100%;
    }
  }
`
