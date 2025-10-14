import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import validator from 'validator'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const useEmailForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const formRef = useRef(null)

  const sendEmail = async (recaptchaToken) => {
    setSubmitError(null)
    setSubmitSuccess(false)

    if (!recaptchaToken) {
      setSubmitError('Please complete the reCAPTCHA verification.')
      return false
    }

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
        'g-recaptcha-response': recaptchaToken
      })

      reset()
      setSubmitSuccess(true)

      setTimeout(() => setSubmitSuccess(false), 5000)

      return true
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitError(error.text || 'Failed to send message. Please try again.')
      return false
    }
  }

  return {
    register: (name, options) => {
      // Add email validation for reply_to field
      if (name === 'reply_to') {
        return register(name, {
          ...options,
          validate: (value) =>
            validator.isEmail(value) || 'Please enter a valid email'
        })
      }
      return register(name, options)
    },
    handleSubmit,
    reset,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    sendEmail,
    formRef
  }
}
