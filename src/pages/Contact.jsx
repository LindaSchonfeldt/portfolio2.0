// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import styled from 'styled-components'

import LoadingFallback from '../components/LoadingFallback'
import Meta from '../components/Meta'
import SectionContainer from '../components/SectionContainer'

// Lazy load the ContactForm to reduce initial bundle size
const ContactForm = lazy(() =>
  import('../components/ContactForm').then((module) => ({
    default: module.ContactForm
  }))
)

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
            <span>{email}</span>
            <CopyIcon
              onClick={handleCopy}
              title='Copy email'
              tabIndex={0}
              role='button'
            >
              <FiCopy />
            </CopyIcon>
            {copied && <CopiedText>Copied!</CopiedText>}
          </EmailRow>
          <Suspense fallback={<LoadingFallback />}>
            <ContactForm />
          </Suspense>
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
  span {
    cursor: pointer;
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
