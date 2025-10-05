import { css } from 'styled-components'

// Common animation mixins to reduce duplicate CSS
export const fadeIn = css`
  animation: fadeIn 0.3s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const slideInFromBottom = css`
  animation: slideInFromBottom 0.5s ease-out;
  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

// Common focus styles for accessibility
export const focusStyles = css`
  &:focus-visible {
    outline: 2px solid var(--accent-orange);
    outline-offset: 2px;
  }
`

// Common button base styles
export const buttonBase = css`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  border-radius: 4px;
  border: 2px solid transparent;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${focusStyles}
`

// Common card styles
export const cardBase = css`
  background: var(--background-light);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

// Common flexbox utilities
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// Common responsive typography
export const responsiveHeading = css`
  font-family: 'Jost', sans-serif;
  line-height: 1.2;

  /* Clamp for responsive sizing */
  font-size: clamp(1.5rem, 4vw, 3rem);
`

export const bodyText = css`
  font-family: 'Raleway', sans-serif;
  line-height: 1.6;
  font-size: clamp(0.9rem, 2vw, 1rem);
`

// Truncate text utility
export const truncateText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

// Screen reader only utility
export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`
