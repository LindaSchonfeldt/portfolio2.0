import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { useMenuStore } from '../stores/useMenuStore'
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

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <Backdrop
              onClick={handleClose}
              role='presentation'
              aria-hidden='true'
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <Menu
              id={menuId}
              role='dialog'
              aria-modal='true'
              ref={menuRef}
              onKeyDown={onMenuKeyDown}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <NavLink
                to='/'
                onClick={handleClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                About
              </NavLink>
              <NavLink
                to='/projects'
                onClick={handleClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Projects
              </NavLink>
              <NavLink
                to='/contact'
                onClick={handleClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Contact
              </NavLink>
            </Menu>
          </Portal>
        )}
      </AnimatePresence>
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  &:nth-child(1) {
    top: ${({ $isOpen }) => ($isOpen ? '50%' : 'calc(50% - 8px)')};
    transform: ${({ $isOpen }) =>
      $isOpen
        ? 'translateX(-50%) rotate(45deg)'
        : 'translateX(-50%) rotate(0)'};
  }
  &:nth-child(2) {
    top: 50%;
    transform: translateX(-50%);
    opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
  }
  &:nth-child(3) {
    top: ${({ $isOpen }) => ($isOpen ? '50%' : 'calc(50% + 8px)')};
    transform: ${({ $isOpen }) =>
      $isOpen
        ? 'translateX(-50%) rotate(-45deg)'
        : 'translateX(-50%) rotate(0)'};
  }
`

const HamburgerButton = styled.button`
  z-index: 6000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  inline-size: 48px;
  block-size: 48px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: var(--gap-xs);

  &:focus-visible {
    outline: 2px solid var(--accent-orange);
    outline-offset: 2px;
  }

  @media ${devices.tablet} {
    right: var(--gap-md);
  }

  @media ${devices.laptop} {
    display: none;
  }
`

const Backdrop = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 9997;
`

const Menu = styled(motion.nav)`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 80px);
  background: var(--background-light);
  z-index: 9998;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: var(--gap-md);
  gap: var(--gap-md);
  border-top: 1px solid var(--gray-200);
`

// Create a motion component first, then style it
const MotionLink = motion.create(Link)
const NavLink = styled(MotionLink)`
  color: var(--text-main);
  text-decoration: none;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  padding: 6px 0;

  &:hover,
  &:focus-visible {
    color: var(--accent-orange);
  }
`
