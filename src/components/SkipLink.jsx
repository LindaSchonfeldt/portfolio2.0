import styled from 'styled-components'

// First stop when tabbing: lets keyboard users jump past the nav to <main>
export const SkipLink = () => (
  <StyledSkipLink href='#main'>Skip to content</StyledSkipLink>
)

/* Hidden until focused with Tab, then shown above the nav */
const StyledSkipLink = styled.a`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 2000;
  padding: 0.75rem 1rem;
  background: var(--primary-green-dark);
  color: var(--text-light);
  font-weight: 600;
  text-decoration: none;
  transform: translateY(-200%);

  &:focus-visible {
    transform: translateY(0);
  }
`
