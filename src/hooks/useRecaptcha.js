import { useRef, useState } from 'react'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

export const useRecaptcha = () => {
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [recaptchaError, setRecaptchaError] = useState(null)
  const recaptchaRef = useRef(null)

  const onRecaptchaChange = (token) => {
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

  const resetRecaptcha = () => {
    setRecaptchaToken(null)
    recaptchaRef.current?.reset()
  }

  return {
    recaptchaToken,
    recaptchaError,
    recaptchaRef,
    recaptchaSiteKey: RECAPTCHA_SITE_KEY,
    onRecaptchaChange,
    onRecaptchaError,
    onRecaptchaExpired,
    resetRecaptcha,
    setRecaptchaError
  }
}
