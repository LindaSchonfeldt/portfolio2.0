import styled from 'styled-components'

import footerBg from '../assets/footer.JPG'
import { Logo } from '../components/Logo'
import SectionContainer from '../components/SectionContainer'
import devices from '../styles/devices'

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterBackground />
      <FooterContent>
        <InfoContainer>
          <h2>Let's talk!</h2>
          <p>linda.schonfeldt@gmail.com</p>
          <br />
          &copy; {new Date().getFullYear()} Linda Schönfeldt. All rights
          reserved.
        </InfoContainer>
        <Logo size='large' alt='' className='footer-logo' />
      </FooterContent>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: auto;
  min-height: 250px;
  margin-top: auto; /* Push footer to bottom if content is short */
  padding: 0; /* Remove padding as we'll handle it in the FooterContent */
  overflow: hidden; /* Ensure the background stays within the footer */
  box-sizing: border-box;
`

const FooterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${footerBg});
  background-size: cover;
  background-position: center;
  opacity: 0.2; /* Adjust opacity to make the content readable */
  z-index: 0;
`

const FooterContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 2rem var(--gap-md);
  box-sizing: border-box;
  text-align: flex-start;
  font-family: 'Raleway', sans-serif;
  font-size: 1rem;
  color: var(--text-main);

  .footer-logo {
    display: none;
  }

  @media ${devices.tablet} {
    flex-direction: row;
    justify-content: space-between;
    .footer-logo {
      display: block;
    }
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;

  h2 {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 0.5rem;
  }

  @media ${devices.tablet} {
    margin-bottom: 0;
  }
`
