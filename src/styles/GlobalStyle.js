import { createGlobalStyle } from 'styled-components'

import { colors } from './colors'
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
  .visuallyHidden {
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

  :root {
    ${colors}
  }

  ${spacing}
  ${typography}
`

export default GlobalStyle
