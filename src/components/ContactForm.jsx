import ReCAPTCHA from 'react-google-recaptcha'
import styled from 'styled-components'

import { useEmailForm } from '../hooks/useEmailForm'
import { useRecaptcha } from '../hooks/useRecaptcha'
import devices from '../styles/devices'
import { Button } from './Button'

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    onSubmit,
    formRef
  } = useEmailForm()

  const {
    recaptchaToken,
    recaptchaError,
    recaptchaRef,
    recaptchaSiteKey,
    onRecaptchaChange,
    onRecaptchaError,
    onRecaptchaExpired,
    resetRecaptcha,
    setRecaptchaError
  } = useRecaptcha()

  const handleFormSubmit = async (data) => {
    if (!recaptchaToken) {
      setRecaptchaError('Please complete the reCAPTCHA verification.')
      return
    }

    const success = await onSubmit(data, recaptchaToken)
    if (success) {
      resetRecaptcha()
    }
  }

  return (
    <StyledForm ref={formRef} onSubmit={handleSubmit(handleFormSubmit)}>
      <InputRow>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='from_name'
          {...register('from_name', { required: 'Name is required' })}
        />
        {errors.from_name && <ErrorText>{errors.from_name.message}</ErrorText>}
      </InputRow>

      <InputRow>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='reply_to'
          type='email'
          {...register('reply_to', {
            required: 'Email is required'
          })}
        />
        {errors.reply_to && <ErrorText>{errors.reply_to.message}</ErrorText>}
      </InputRow>

      <InputRow>
        <label htmlFor='message'>Message</label>
        <textarea
          id='message'
          name='message'
          rows={5}
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && <ErrorText>{errors.message.message}</ErrorText>}
      </InputRow>

      {recaptchaSiteKey ? (
        <RecaptchaContainer>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recaptchaSiteKey}
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
        label={isSubmitting ? 'Sending...' : 'Send'}
        disabled={isSubmitting || !recaptchaToken}
      />

      {submitSuccess && (
        <SuccessMessage>
          ✓ Thank you! Your message has been sent.
        </SuccessMessage>
      )}
      {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
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

  textarea {
    resize: vertical;
    min-height: 100px;
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

const ErrorText = styled.span`
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
  font-family: 'Raleway', sans-serif;
`

const SuccessMessage = styled.div`
  color: var(--primary-green-dark);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
`
