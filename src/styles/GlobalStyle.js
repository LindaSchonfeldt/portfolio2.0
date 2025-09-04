import { createGlobalStyle } from 'styled-components'
import { typography } from './typography'
import { colors } from './colors'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    ${colors}
  }

  body {
    background-color: #f5f5f5;
    color: #333;
    font-family: 'Poppins', sans-serif; /* Set your default font here */
  }

  ${typography}
`

export default GlobalStyle

// Eample usage in a styled component
/* const Button = styled.button`
  background: var(--accent-orange);
  color: var(--text-light);
  border: 1px solid var(--border-color);
`

const Section = styled.section`
  background: var(--background-green);
  color: var(--text-main);
` */
