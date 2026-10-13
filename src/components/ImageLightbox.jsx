import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

export const ImageLightbox = ({ src, alt, onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  // Portal to body so transformed ancestors don't break position: fixed
  return createPortal(
    <LightboxOverlay onClick={onClose}>
      <CloseButton
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label='Close fullscreen image'
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </svg>
      </CloseButton>
      <LightboxContent onClick={(e) => e.stopPropagation()}>
        <LightboxImage src={src} alt={alt} />
      </LightboxContent>
    </LightboxOverlay>,
    document.body
  )
}

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: zoom-out;
  animation: fadeIn 0.2s ease-in;
`

const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  max-height: 90dvh;
  cursor: default;
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  z-index: 1;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 32px;
    height: 32px;
  }
`

const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  max-height: 90dvh;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`
