import styled from 'styled-components'

import {
  Button,
  ResponsiveImage,
  SectionContainer,
  TagGroup
} from '../components'
import devices from '../styles/devices'

export const Hero = () => {
  return (
    <SectionContainer id='introduction'>
      <HeroLayout>
        <HeroContent>
          <h1 className='heroTitle'>Frontend Developer</h1>
          <h2 className='heroSubtitle'>
            with a background in Interaction Design
          </h2>
          <div className='heroText'>
            <p>
              I'm particularly drawn to healthtech and products where what you
              build genuinely matters to the person using it. I moved into
              development because I didn't want to stop at the design — I wanted
              to be the one who actually builds it. A background in interaction
              design means I think in user needs and flows before I think in
              components and code.
            </p>
          </div>
          <TagGroup
            tags={[
              'React',
              'JavaScript',
              'HTML/CSS',
              'TailwindCSS',
              'Figma',
              'REST APIs'
            ]}
          />
          <ActionWrapper>
            <ButtonWrapper>
              <Button
                variant='secondary'
                label={'Download CV'}
                className='heroButton'
                url='/pdfs/linda.schonfeldt_cv.pdf'
                aria-label='Download CV'
              />
              <Button
                variant='primary'
                label={'Contact Me'}
                className=''
                url='/contact'
                aria-label='Contact Me'
              />
            </ButtonWrapper>
          </ActionWrapper>
        </HeroContent>
        <PhotoWrapper>
          <ResponsiveImage
            webpSrc='/images/linda.webp'
            fallbackSrc='/images/linda.png'
            alt='Linda Schönfeldt'
            eager={true}
          />
        </PhotoWrapper>
      </HeroLayout>
    </SectionContainer>
  )
}

const HeroLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
  align-items: center;

  @media ${devices.tablet} {
    flex-direction: row;
    align-items: center;
    gap: 3rem;
  }
`

const PhotoWrapper = styled.div`
  display: none;

  @media ${devices.tablet} {
    display: block;
    flex-shrink: 0;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: auto;

    img,
    picture {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      border-radius: 50%;
    }
  }

  @media ${devices.laptop} {
    width: 320px;
    height: 320px;
  }
`

const HeroContent = styled.div`
  width: 100%;
  text-align: left;

  @media ${devices.laptop} {
    width: 50%;
  }

  @media ${devices.laptopL} {
    width: 60%;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .heroTitle {
    color: var(--primary-green-dark);
    font-size: 3.7rem;
    line-height: 0.8;
    margin-bottom: 1rem;

    @media ${devices.mobileL} {
      font-size: 5rem;
    }
  }

  .heroSubtitle {
    color: var(--primary-green-dark);
    font-size: 1.5rem;
    line-height: 1;
    width: 90%;
    margin-bottom: 1.5rem;

    @media ${devices.mobileL} {
      font-size: 2.5rem;
    }
  }

  .heroText {
    width: 100%;

    @media ${devices.tablet} {
      width: 85%;
    }

    @media ${devices.laptop} {
      width: 100%;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-top: 0.7rem;
  width: 100%;

  button,
  a {
    flex: 1;
    margin-bottom: 0;
  }
`

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;

  .socialIcons {
    display: flex;
    gap: var(--gap-md);
    width: 100%;
    justify-content: center;

    @media ${devices.mobileM} {
      gap: var(--gap-lg);
    }

    @media ${devices.mobileL} {
      justify-content: flex-start;
      gap: var(--gap-sm);
    }
  }
`
