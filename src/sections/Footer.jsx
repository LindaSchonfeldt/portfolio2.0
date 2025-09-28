import { IoMail } from 'react-icons/io5'
import styled from 'styled-components'

import footerBg from '../assets/footer.JPG'
import LazyImage from '../components/LazyImage'
import { Logo } from '../components/Logo'
import devices from '../styles/devices'
import { fullBleed } from '../styles/spacing'

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterBackground>
        <LazyImage src={footerBg} alt='Footer background' />
      </FooterBackground>
      <ContentContainer>
        <FooterContent>
          <InfoContainer>
            <h2>Let's talk!</h2>
            <a
              href='mailto:linda.schonfeldt@gmail.com'
              aria-label='Email me'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IoMail size={32} color='var(--primary-green-dark)' />
            </a>
            <br />
            &copy; {new Date().getFullYear()} Linda Schönfeldt. All rights
            reserved.
          </InfoContainer>
          <Logo size='large' alt='' className='footer-logo' />
        </FooterContent>
      </ContentContainer>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  position: relative;
  ${fullBleed}
  height: auto;
  min-height: 250px;
  margin-top: auto; /* Push footer to bottom if content is short */
  padding: 0; /* Remove padding as we'll handle it in the FooterContent */
  overflow: hidden; /* Ensure the background stays within the footer */
  box-sizing: border-box;
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  width: 100%;

  @media ${devices.laptop} {
    max-width: 1200px;
  }

  @media ${devices.desktop} {
    max-width: 1400px;
  }
`

const FooterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2; /* Adjust opacity to make the content readable */
  z-index: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
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
