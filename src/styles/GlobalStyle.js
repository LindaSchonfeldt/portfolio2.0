import { createGlobalStyle } from 'styled-components'

import { colors } from './colors'
import { focusStyles } from './mixins'
import { spacing } from './spacing'
import { typography } from './typography'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }
  
  body {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Accessibility class for screen-reader-only content */
  .visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }

  /* CSS counterpart to MotionConfig: CSS animations, transitions and smooth
     scrolling are effectively turned off. !important beats inline styles */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* One keyboard focus style for every interactive element, so links and
     controls without their own styles never fall back to the browser default */
  a,
  button,
  input,
  select,
  textarea,
  summary,
  [tabindex]:not([tabindex='-1']) {
    ${focusStyles}
  }

  :root {
    ${colors}
  }

  ${spacing}
  ${typography}

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

export default GlobalStyle
