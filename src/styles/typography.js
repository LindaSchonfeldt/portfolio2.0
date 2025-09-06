import { css } from 'styled-components'

export const typography = css`
  h1,
  h2,
  h3 {
    font-family: 'Jost', sans-serif;
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  p {
    font-family: 'Raleway', sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  a {
    font-family: 'Raleway', sans-serif;
    font-size: 1rem;
    text-decoration: none;
    color: inherit;
  }
`

export default typography
