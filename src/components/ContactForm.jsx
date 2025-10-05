import { useForm } from 'react-hook-form'
import emailjs from 'emailjs-com'
import styled from 'styled-components'
import devices from '../styles/devices'
import validator from 'validator'
import { Button } from './Button'

// Load environment variables for EmailJS
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm()

  const onSubmit = async (data) => {
    // Validate email using validator.js
    if (!validator.isEmail(data.email)) {
      alert('Please enter a valid email address.')
      return
    }
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID)
      reset()
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

      <Button type='submit' disabled={isSubmitting}>
        Send
      </Button>
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
    font-weight: 500;
  }

        <input
          id='email'
          type='email'
          {...register('email', {
            required: true,
            validate: value => validator.isEmail(value) || 'Invalid email address'
          })}
          placeholder={errors.email ? errors.email.message || 'Email is required' : ''}
          style={errors.email ? { borderColor: 'red' } : {}}
        />
  }

  span {
    color: red;
  }

  @media ${devices.tablet} {
    width: 50%;
  }
  }
`

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: -0.2rem;
`
