// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useState } from 'react'
import styled from 'styled-components'
import { RiFileCopyLine } from 'react-icons/ri'

import { Meta, SectionContainer } from '../components'

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
        description='Get in touch with Linda Schönfeldt for web development and design inquiries.'
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <SectionContainer id='contact'>
          <h2>Contact</h2>
          <p>
            Have a project in mind? I'd love to help bring your ideas to life
            through thoughtful design and development.
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
          {/* ContactForm hidden until reCAPTCHA works, re-add <ContactForm /> here */}
        </SectionContainer>
      </motion.div>
    </>
  )
}

export default Contact

const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
