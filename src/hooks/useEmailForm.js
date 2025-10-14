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

  const onSubmit = async (data, recaptchaToken) => {
    // Reset previous errors
    setSubmitError(null)
    setSubmitSuccess(false)

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setSubmitError('Please complete the reCAPTCHA verification.')
      return false
    }

    // Validate email using validator.js
    if (!validator.isEmail(data.reply_to)) {
      setSubmitError('Please enter a valid email address.')
      return false
    }

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
        'g-recaptcha-response': recaptchaToken
      })

      // Success
      reset()
      setSubmitSuccess(true)
      setSubmitError(null)

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)

      return true
    } catch (error) {
      console.error('EmailJS error:', error)

      // Handle specific error messages
      if (error.text) {
        setSubmitError(`Failed to send message: ${error.text}`)
      } else if (error.status === 400) {
        setSubmitError('Invalid form data. Please check your inputs.')
      } else if (error.status === 401) {
        setSubmitError(
          'Email service configuration error. Please contact the site owner.'
        )
      } else {
        setSubmitError('Failed to send message. Please try again later.')
      }

      return false
    }
  }

  return {
    register,
    handleSubmit,
    reset,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    onSubmit,
    formRef
  }
}
