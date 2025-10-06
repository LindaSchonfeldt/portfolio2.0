import { IoMail } from 'react-icons/io5'
import styled from 'styled-components'

import ResponsiveImage from '../components/ResponsiveImage'
import { Logo } from '../components/Logo'
import devices from '../styles/devices'
import { fullBleed } from '../styles/spacing'
import { SocialLinks } from '../components/SocialLinks'

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterBackground>
        <ResponsiveImage
          webpSrc='/images/footer.webp'
          fallbackSrc='/images/footer.jpg'
          alt='Footer background'
          eager={true}
        />
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
        <BottomSocials>
          <SocialLinks />
        </BottomSocials>
      </ContentContainer>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  position: relative;
  ${fullBleed}
  height: auto;
  min-height: 250px;
  margin-top: auto;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;

  background: linear-gradient(
      to bottom,
      rgba(13, 69, 58, 0.95),
      rgba(13, 69, 58, 0.98)
    ),
    url('/images/footer.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  border-top: 2px solid var(--primary-green-dark);

  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  width: 100%;
  display: flex;
  flex-direction: column;

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
  opacity: 0.2;
  z-index: 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
  }
`

const FooterContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem var(--gap-md) 0;
  box-sizing: border-box;
  text-align: flex-start;
  font-family: 'Raleway', sans-serif;
  font-size: 1rem;
  color: var(--text-light);

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

const BottomSocials = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 2rem;
  padding: 1rem var(--gap-md) 2rem;
  width: 100%;
  display: flex;
  justify-content: center;

  @media ${devices.tablet} {
    justify-content: center;
  }
`
