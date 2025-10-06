import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { useNavStore } from '../stores/useNavStore'
import devices from '../styles/devices'
import { useRoutePreloader } from '../utils/routePreloader'

export const Nav = () => {
  // Use the nav store for global state
  const expandedItem = useNavStore((state) => state.expandedItem)
  const toggleExpanded = useNavStore((state) => state.toggleExpanded)

  // Route preloader for better performance
  const { preloadOnHover } = useRoutePreloader()

  // Define sections for each page
  const pageSections = {
    about: ['Introduction', 'Services', 'Skills', 'Experience'],
    projects: [],
    contact: []
  }

  return (
    <NavContainer>
      <NavLinks>
        <NavItem>
          <StyledNavLink
            to='/'
            $primary
            onClick={() => toggleExpanded('about')}
            $expanded={expandedItem === 'about'}
            {...preloadOnHover('home')}
          >
            About
          </StyledNavLink>
          {expandedItem === 'about' && (
            <SectionLinks>
              {pageSections.about.map((section, index) => (
                <SectionItem key={index}>
                  <SectionLink
                    to={`/#${section.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => {
                      // Prevent default to handle scroll with JS
                      e.preventDefault()
                      const target = document.getElementById(
                        section.toLowerCase().replace(/\s+/g, '-')
                      )
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    {section}
                  </SectionLink>
                </SectionItem>
              ))}
            </SectionLinks>
          )}
        </NavItem>
        <NavItem>
          <StyledNavLink
            to={'/projects'}
            $primary
            onClick={() => toggleExpanded('projects')}
            $expanded={expandedItem === 'projects'}
            {...preloadOnHover('projects')}
          >
            Projects
          </StyledNavLink>
          {expandedItem === 'projects' && (
            <SectionLinks>
              {pageSections.projects.map((section, index) => (
                <SectionItem key={index}>
                  <SectionLink
                    to={`/projects#${section
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    {section}
                  </SectionLink>
                </SectionItem>
              ))}
            </SectionLinks>
          )}
        </NavItem>
        <NavItem>
          <StyledNavLink
            to='/contact'
            $primary
            onClick={() => toggleExpanded('contact')}
            $expanded={expandedItem === 'contact'}
            {...preloadOnHover('contact')}
          >
            Contact
          </StyledNavLink>
          {expandedItem === 'contact' && (
            <SectionLinks>
              {pageSections.contact.map((section, index) => (
                <SectionItem key={index}>
                  <SectionLink
                    to={`/contact#${section
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    {section}
                  </SectionLink>
                </SectionItem>
              ))}
            </SectionLinks>
          )}
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
  list-style: none;
`

const NavItem = styled.li`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: var(--accent-red);
  border-color: var(--accent-red);
  color: white;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  padding: 1rem;
  width: 110px;
  height: 60px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;

  &:hover {
    width: 120px; /* Expand to the left */
  }

  &.active {
    background-color: var(--accent-red);
  }

  ${(props) =>
    props.$expanded &&
    `
    width: 120px; /* Expand to the left when expanded */
  `}
`

const SectionLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-top: 0.25rem;
  width: 100%;
  align-items: flex-end;
`

const SectionItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const SectionLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--text-main);
  font-weight: 400;
  font-size: 0.8rem;
  padding: 0.3rem;
  width: auto;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    color: var(--text-main);
    width: 95px; /* Expand to the left */
  }

  &:active {
    color: var(--text-main);
    text-decoration: underline;
    font-weight: 500;
  }
`
