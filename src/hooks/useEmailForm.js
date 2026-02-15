import emailjs from '@emailjs/browser'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import validator from 'validator'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const getEmailErrorMessage = (error) => {
  const errorText = (error?.text || '').toLowerCase()

  if (errorText.includes('recaptcha: invalid-keys')) {
    return 'Email service reCAPTCHA keys are invalid. Update reCAPTCHA Site Key + Secret Key in your EmailJS account settings and ensure they match your current Google reCAPTCHA v2 keys.'
  }

  if (errorText.includes('recaptcha')) {
    return 'reCAPTCHA verification failed in EmailJS. Confirm your EmailJS reCAPTCHA keys and allowed domains are configured correctly.'
  }

  return (
    error?.text ||
    'Failed to send message. Please verify your EmailJS template fields and try again.'
  )
}

export const useEmailForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const sendEmail = async (formData, recaptchaToken) => {
    setSubmitError(null)
    setSubmitSuccess(false)

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSubmitError('Email service is not configured correctly.')
      return false
    }

    if (!recaptchaToken) {
      setSubmitError('Please complete the reCAPTCHA verification.')
      return false
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          'g-recaptcha-response': recaptchaToken
        },
        {
          publicKey: PUBLIC_KEY
        }
      )

      reset()
      setSubmitSuccess(true)

      setTimeout(() => setSubmitSuccess(false), 5000)

      return true
    } catch (error) {
      console.error('EmailJS error:', {
        status: error?.status,
        text: error?.text,
        message: error?.message
      })
      setSubmitError(getEmailErrorMessage(error))
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
    sendEmail
  }
}
