import { FaDribbble, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styled from 'styled-components'

export const SocialLinks = () => {
  return (
    <StyledSocialLinks>
      <h2 className='visuallyHidden'>Connect With Me</h2>
      <ul className='socialIcons'>
        {/* LinkedIn */}
        <li>
          <a
            href='https://www.linkedin.com/in/linda-sch%C3%B6nfeldt/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Visit my LinkedIn profile'
          >
            <FaLinkedin className='socialIcon' size={28} />
          </a>
        </li>

        {/* GitHub */}
        <li>
          <a
            href='https://github.com/LindaSchonfeldt'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Visit my GitHub'
          >
            <FaGithub className='socialIcon' size={28} />
          </a>
        </li>

        {/* Dribbble */}
        <li>
          <a
            href='https://dribbble.com/lindaschonfeldt'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Visit my Dribble'
          >
            <FaDribbble className='socialIcon' size={28} />
          </a>
        </li>

        {/* Instagram */}
        <li>
          <a
            href='https://www.instagram.com/linda.schonfeldt/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Visit my Instagram'
          >
            <FaInstagram className='socialIcon' size={28} />
          </a>
        </li>
      </ul>
    </StyledSocialLinks>
  )
}

const StyledSocialLinks = styled.nav`
  margin: var(--gap-sm) 0 0 0;
  width: 100%;

  .socialIcons {
    display: flex;
    flex-direction: row;
    gap: var(--gap-md);
    list-style: none;
    width: 100%;
  }

  .socialIcons a {
    display: inline-block;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.1);
    }
  }

  .socialIcon {
    fill: var(--accent-orange);
    transition: all 0.3s ease-in-out;
  }
`
