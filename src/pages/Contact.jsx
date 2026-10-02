// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useState } from 'react'
import { RiFileCopyLine } from 'react-icons/ri'
import styled from 'styled-components'

import { Button, Meta, SectionContainer } from '../components'
import devices from '../styles/devices'

const Contact = () => {
  const [copied, setCopied] = useState(false)

  const email = 'linda.schonfeldt@gmail.com'
  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <Meta
        title='Contact | Linda Schönfeldt Portfolio'
        description='Get in touch with Linda Schönfeldt, a UX-minded frontend developer in Stockholm open to frontend roles in healthtech and beyond.'
      />
      <motion.div
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <SectionContainer id='contact'>
          <StyledText>
            <h1>Contact</h1>
            <p>
              I'm looking for a frontend role close to design, ideally within
              healthtech, mental health or women's health, in Stockholm or
              remote. If you're building something that matters to the people
              who use it, I'd love to hear from you.
            </p>
            <p>
              Just want to chat about a product, an idea or UX in healthcare?
              That's welcome too.
            </p>
            <EmailRow>
              <a href={`mailto:${email}`}>{email}</a>
              <CopyIcon
                onClick={handleCopy}
                title='Copy email'
                tabIndex={0}
                role='button'
              >
                <RiFileCopyLine />
              </CopyIcon>
              {copied && <CopiedText>Copied!</CopiedText>}
            </EmailRow>
            <Button
              variant='secondary'
              label={'Download CV'}
              className='heroButton'
              url='/pdfs/linda.schonfeldt_cv.pdf'
              aria-label='Download CV'
            />
          </StyledText>
          {/* ContactForm hidden until reCAPTCHA works, re-add <ContactForm /> here */}
        </SectionContainer>
      </motion.div>
    </>
  )
}

export default Contact

const StyledText = styled.div`
  max-width: 65ch;

  p {
    margin-bottom: 1.5rem;
  }

  p:not(.lead) {
    line-height: 1.7;

    @media ${devices.laptop} {
      font-size: 1.125rem;
    }
  }
`

const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: var(--primary-green-dark);
    }
  }
`

const CopyIcon = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: var(--primary-green-dark);
  transition: color 0.2s;
  &:hover {
    color: var(--accent-orange);
  }
`

const CopiedText = styled.span`
  margin-left: 0.5rem;
  color: var(--accent-orange);
  font-size: 0.95em;
`
