import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Info, FolderGit2, Mail } from 'lucide-react'

import { useNavStore } from '../stores/useNavStore'
import devices from '../styles/devices'
import { preloadProjectImages } from '../utils/preloadImages'
import { useRoutePreloader } from '../utils/routePreloader'

export const Nav = () => {
  // Use the nav store for global state
  const expandedItem = useNavStore((state) => state.expandedItem)
  const toggleExpanded = useNavStore((state) => state.toggleExpanded)

  // Route preloader for better performance
  const { preloadOnHover } = useRoutePreloader()

  // Define sections for each page
  const pageSections = {
    about: ['Introduction', 'Skills', 'Experience'],
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
            <IconWrapper>
              <Info size={24} />
            </IconWrapper>
            <TextLabel>About</TextLabel>
          </StyledNavLink>
          {expandedItem === 'about' && (
            <SectionLinks $hasSections={pageSections.about.length > 0}>
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
            onMouseEnter={preloadProjectImages}
            {...preloadOnHover('projects')}
          >
            <IconWrapper>
              <FolderGit2 size={24} />
            </IconWrapper>
            <TextLabel>Projects</TextLabel>
          </StyledNavLink>
          {expandedItem === 'projects' && (
            <SectionLinks $hasSections={pageSections.projects.length > 0}>
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
            <IconWrapper>
              <Mail size={24} />
            </IconWrapper>
            <TextLabel>Contact</TextLabel>
          </StyledNavLink>
          {expandedItem === 'contact' && (
            <SectionLinks $hasSections={pageSections.contact.length > 0}>
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
    top: 25%;
    right: 0;
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
  background-color: var(--accent-red);
  border-color: var(--accent-red);
  color: white;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  padding: 1rem;
  width: 60px;
  height: 50px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 4px solid var(--accent-red-dark);
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    width: 80px;
  }

  &.active {
    width: 80px;
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

const SectionLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-top: ${(props) => (props.$hasSections ? '0.25rem' : '0')};
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
    width: 95px;
  }

  &:active {
    color: var(--text-main);
    text-decoration: underline;
    font-weight: 500;
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media ${devices.desktop} {
    display: none;
  }

  @media ${devices.laptopL} {
    display: none;
  }
`

const TextLabel = styled.span`
  display: none;

  @media ${devices.desktop} {
    display: inline;
  }

  @media ${devices.laptopL} {
    display: inline;
  }
`
