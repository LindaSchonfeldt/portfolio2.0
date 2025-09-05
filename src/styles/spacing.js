import { css } from 'styled-components'

import devices from './media'

export const spacing = css`
  :root {
    --section-padding: 4rem 2rem;
    --section-gap: 4rem;
    --gap-xs: 0.5rem;
    --gap-sm: 1rem;
    --gap-md: 2rem;
    --gap-lg: 4rem;
  }

  @media ${devices.mobileS} {
    :root {
      --section-padding: 6rem 1rem;
      --section-gap: 6rem;
    }
  }
  @media ${devices.mobileM} {
    :root {
      --section-padding: 6rem 2rem;
      --section-gap: 6rem;
    }
  }
  @media ${devices.mobileL} {
    :root {
      --section-padding: 6rem 2rem;
      --section-gap: 6rem;
    }
  }
  @media ${devices.tablet} {
    :root {
      --section-padding: 6rem 4rem;
      --section-gap: 6rem;
    }
  }
  @media ${devices.laptop} {
    :root {
      --section-padding: 6rem 8rem;
      --section-gap: 6rem;
    }
  }
  @media ${devices.laptopL} {
    :root {
      --section-padding: 6rem 12rem;
      --section-gap: 6rem;
    }
  }
  @media ${devices.desktop} {
    :root {
      --section-padding: 6rem 16rem;
      --section-gap: 6rem;
    }
  }
`

// Full-bleed utility as a styled-components mixin
export const fullBleed = css`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`
