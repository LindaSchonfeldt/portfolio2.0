import { FolderGit2, Info, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { useNavStore } from '../stores/useNavStore'
import devices from '../styles/devices'
import { preloadProjectImages } from '../utils/preloadImages'
import { useRoutePreloader } from '../utils/routePreloader'

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Use the nav store for global state
  const expandedItem = useNavStore((state) => state.expandedItem)
  const toggleExpanded = useNavStore((state) => state.toggleExpanded)

  // Route preloader for better performance
  const { preloadOnHover } = useRoutePreloader()

  // Define sections for each page
  const pageSections = {
    about: ['Introduction', 'Skills', 'Contact'],
    projects: [],
    contact: []
  }

  return (
    <NavContainer $scrolled={scrolled}>
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
    flex-direction: row;
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    width: 100%;
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
