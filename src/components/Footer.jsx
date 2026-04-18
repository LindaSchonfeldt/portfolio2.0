import { AiOutlineMail } from 'react-icons/ai'
import styled from 'styled-components'

import devices from '../styles/devices'
import { fullBleed } from '../styles/spacing'
import { SocialLinks } from './SocialLinks'

export const Footer = () => {
  return (
    <StyledFooter>
      <ContentContainer>
        <FooterContent>
          <InfoContainer>
            <FooterTitle>Let's talk!</FooterTitle>
            <a href='mailto:linda.schonfeldt@gmail.com' aria-label='Email me'>
              <MailIcon size={54} />
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
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4rem 1rem;
  box-sizing: border-box;

  @media ${devices.tablet} {
    padding: 8rem 1.5rem;
  }

  @media ${devices.laptop} {
    padding: 12rem 6rem;
  }

  @media ${devices.desktop} {
    padding: 12rem 12rem;
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
const FooterTitle = styled.h2`
  font-family: 'Jost', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-light);

  @media ${devices.tablet} {
    font-size: 2rem;
  }

  @media ${devices.laptop} {
    font-size: 2.5rem;
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
  width: 100%;
  display: flex;
  justify-content: center;
`

const Copyright = styled.p`
  color: var(--text-light);
  font-size: 0.75rem;
  opacity: 0.6;
  text-align: left;
  margin: 1rem 0 0;
`

const MailIcon = styled(AiOutlineMail)`
  color: var(--accent-orange);
`
