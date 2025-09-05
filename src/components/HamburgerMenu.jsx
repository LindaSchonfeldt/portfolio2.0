import { useMenuStore } from '../stores/useMenuStore'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import devices from '../styles/devices.js'
// Import styling CSS variables
import '../styles/colors.js'
import '../styles/spacing.js'

const Portal = ({ children }) => createPortal(children, document.body)

export const HamburgerMenu = () => {
  // ✅ selectors so re-renders happen reliably
  const isOpen = useMenuStore((s) => s.isOpen)
  const toggleMenu = useMenuStore((s) => s.toggleMenu)
  const closeMenu = useMenuStore((s) => s.closeMenu)

  const location = useLocation()
  const buttonRef = useRef(null)
  const menuRef = useRef(null)
  const menuId = 'mobile-menu'

  const handleClose = useCallback(() => {
    closeMenu()
    buttonRef.current?.focus()
  }, [closeMenu])

  // ✅ Close when the ROUTE changes (only depends on pathname)
  useEffect(() => {
    if (!isOpen) return
    closeMenu()
    const id = requestAnimationFrame(() => buttonRef.current?.focus())
    return () => cancelAnimationFrame(id)
    // we intentionally omit deps to avoid closing on open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, handleClose])

  // Prevent body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  // Focus first focusable in menu on open
  useEffect(() => {
    if (!isOpen) return
    const id = requestAnimationFrame(() => {
      const first = menuRef.current?.querySelector(
        'a, button, [tabindex]:not([tabindex="-1"])'
      )
      first?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  // Trap focus inside the menu
  const onMenuKeyDown = useCallback((e) => {
    if (e.key !== 'Tab') return
    const nodes = menuRef.current?.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    if (!nodes || !nodes.length) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <>
      <HamburgerButton
        ref={buttonRef}
        onClick={toggleMenu}
        type='button'
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label='Toggle menu'
      >
        <Bar $isOpen={isOpen} />
        <Bar $isOpen={isOpen} />
        <Bar $isOpen={isOpen} />
      </HamburgerButton>

      {isOpen && (
        <Portal>
          <Backdrop
            onClick={handleClose}
            role='presentation'
            aria-hidden='true'
          />
          <Menu
            id={menuId}
            role='dialog'
            aria-modal='true'
            ref={menuRef}
            onKeyDown={onMenuKeyDown}
          >
            <Link to='/' className='link-underline' onClick={handleClose}>
              About
            </Link>
            <Link
              to='/projects'
              className='link-underline'
              onClick={handleClose}
            >
              Projects
            </Link>
            <Link
              to='/contact'
              className='link-underline'
              onClick={handleClose}
            >
              Contact
            </Link>
          </Menu>
        </Portal>
      )}
    </>
  )
}

const Bar = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  background: var(--text-main);
  margin: 4px 0;
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s, background-color 0.2s;
  &:nth-child(1) {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(45deg) translateY(9px)' : 'none'};
  }
  &:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
  }
  &:nth-child(3) {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(-45deg) translateY(-10px)' : 'none'};
  }
`

const HamburgerButton = styled.button`
  z-index: 6000;
  display: block;
  inline-size: 48px;
  block-size: 48px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  left: var(--gap-md);
  &:focus-visible {
    outline: 2px solid var(--accent-orange);
    outline-offset: 2px;
  }
  @media ${devices.laptop} {
    display: none;
  }
`

/* Non-focusable backdrop */
const Backdrop = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 9997;
`

const Menu = styled.nav`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 80px);
  background: var(--background-light);
  z-index: 9998;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--gap-md);
  gap: var(--gap-md);
  border-top: 1px solid var(--gray-200);

  a {
    color: var(--text-main);
    text-decoration: none;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    padding: 6px 0;
  }
  a:hover,
  a:focus-visible {
    color: var(--accent-orange);
  }
`
