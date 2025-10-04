import { useForm } from 'react-hook-form'
import emailjs from 'emailjs-com'

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
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID)
      reset()
      alert('Message sent!')
    } catch (error) {
      alert('Failed to send message.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='name'>Name</label>
      <input id='name' {...register('name', { required: true })} />
      {errors.name && <span>Name is required</span>}

      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        {...register('email', { required: true })}
      />
      {errors.email && <span>Email is required</span>}

      <label htmlFor='message'>Message</label>
      <textarea id='message' {...register('message', { required: true })} />
      {errors.message && <span>Message is required</span>}

      <button type='submit' disabled={isSubmitting}>
        Send
      </button>
      {isSubmitSuccessful && <p>Thank you for your message!</p>}
    </form>
  )
}
