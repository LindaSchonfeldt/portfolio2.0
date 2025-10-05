import { useForm } from 'react-hook-form'
import emailjs from 'emailjs-com'
import styled from 'styled-components'
import { useRef, useState, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import devices from '../styles/devices'
import validator from 'validator'
import { Button } from './Button'

// Load environment variables for EmailJS and reCAPTCHA
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm()

  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [recaptchaError, setRecaptchaError] = useState(null)
  const recaptchaRef = useRef(null)

  // Load reCAPTCHA script dynamically only when contact form is rendered
  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
  }, [])

  const onRecaptchaChange = (token) => {
    console.log('reCAPTCHA token received:', token ? 'Yes' : 'No')
    setRecaptchaToken(token)
    setRecaptchaError(null)
  }

  const onRecaptchaError = () => {
    console.error('reCAPTCHA error occurred')
    setRecaptchaError('reCAPTCHA failed to load. Please refresh and try again.')
    setRecaptchaToken(null)
  }

  const onRecaptchaExpired = () => {
    console.warn('reCAPTCHA expired')
    setRecaptchaToken(null)
    setRecaptchaError('reCAPTCHA expired. Please verify again.')
  }

  const onSubmit = async (data) => {
    console.log('Form submission started')
    console.log('reCAPTCHA token exists:', !!recaptchaToken)
    console.log('RECAPTCHA_SITE_KEY:', RECAPTCHA_SITE_KEY ? 'Set' : 'Not set')

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification.')
      return
    }

    // Validate email using validator.js
    if (!validator.isEmail(data.email)) {
      alert('Please enter a valid email address.')
      return
    }

    try {
      // Include reCAPTCHA token in the email data
      const emailData = {
        ...data,
        'g-recaptcha-response': recaptchaToken
      }

      console.log('Sending email with reCAPTCHA token')
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID)
      reset()
      setRecaptchaToken(null)
      recaptchaRef.current?.reset()
      alert('Message sent!')
    } catch (error) {
      console.error('EmailJS error:', error)
      alert('Failed to send message.')
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <InputRow>
        <label htmlFor='name'>Name</label>
        <input id='name' {...register('name', { required: true })} />
        {errors.name && <span>Name is required</span>}
      </InputRow>

      <InputRow>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          {...register('email', { required: true })}
        />
        {errors.email && <span>Email is required</span>}
      </InputRow>

      <InputRow>
        <label htmlFor='message'>Message</label>
        <textarea id='message' {...register('message', { required: true })} />
        {errors.message && <span>Message is required</span>}
      </InputRow>

      {RECAPTCHA_SITE_KEY ? (
        <RecaptchaContainer>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={onRecaptchaChange}
            onErrored={onRecaptchaError}
            onExpired={onRecaptchaExpired}
            theme='light'
          />
          {recaptchaError && <ErrorMessage>{recaptchaError}</ErrorMessage>}
        </RecaptchaContainer>
      ) : (
        <ErrorMessage>
          reCAPTCHA not configured. Please check your environment variables.
        </ErrorMessage>
      )}

      <Button
        type='submit'
        label='Send'
        disabled={isSubmitting || !recaptchaToken}
      />
      {isSubmitSuccessful && <p>Thank you for your message!</p>}
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  label {
    font-family: 'Raleway', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
  }

  input,
  textarea {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
    font-family: 'Raleway', sans-serif;
    transition: border-color 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: var(--primary-green-dark);
      box-shadow: 0 0 0 2px rgba(44, 62, 47, 0.2);
    }

    &:active {
      border-color: var(--primary-green-dark);
    }

    &:hover {
      border-color: var(--primary-green);
    }
  }

  span {
    color: red;
  }

  @media ${devices.tablet} {
    width: 50%;
  }
`

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

const RecaptchaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;

  @media ${devices.mobileS} {
    transform: scale(0.8);
    transform-origin: center;
  }

  @media ${devices.tablet} {
    transform: scale(1);
  }
`

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
  font-family: 'Raleway', sans-serif;
`
