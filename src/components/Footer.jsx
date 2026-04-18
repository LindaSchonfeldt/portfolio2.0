import { IoMail } from 'react-icons/io5'
import styled from 'styled-components'

import devices from '../styles/devices'
import { fullBleed } from '../styles/spacing'
import ResponsiveImage from './ResponsiveImage'
import { SocialLinks } from './SocialLinks'

export const Footer = () => {
  return (
    <StyledFooter>
      <ContentContainer>
        <FooterContent>
          <InfoContainer>
            <h2>Let's talk!</h2>
            <a href='mailto:linda.schonfeldt@gmail.com' aria-label='Email me'>
              <MailIcon size={42} />
            </a>
            <br />
          </InfoContainer>
        </FooterContent>
        <BottomSocials>
          <SocialLinks />
        </BottomSocials>
        <Copyright>
          &copy; {new Date().getFullYear()} Linda Schönfeldt. All rights
          reserved.
        </Copyright>
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
  background-color: var(--primary-green-dark);
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

const Copyright = styled.p`
  color: var(--text-light);
  font-size: 0.75rem;
  opacity: 0.6;
  text-align: left;
  padding: 0 var(--gap-md) 1rem;
  margin: 0;
`

const MailIcon = styled(IoMail)`
  color: var(--accent-orange);
`
