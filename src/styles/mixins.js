import { css } from 'styled-components'

export const focusStyles = css`
  &:focus-visible {
    outline: 2px solid var(--accent-orange);
    outline-offset: 2px;
  }
`

export const buttonBase = css`
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  border-radius: 0px;
  border: 2px solid transparent;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${focusStyles}
`

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
