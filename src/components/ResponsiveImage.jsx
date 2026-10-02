import { useEffect, useRef, useState } from 'react'

// Generate srcset from a base path: -small (400w), -medium (800w), full (1200w)
const generateSrcSet = (src, extension) => {
  if (!src) return ''
  const basePath = src.replace(/\.(webp|png|jpg|jpeg)$/, '')
  return `${basePath}-small.${extension} 400w, ${basePath}-medium.${extension} 800w, ${basePath}.${extension} 1200w`
}

export const ResponsiveImage = ({
  webpSrc,
  fallbackSrc,
  alt,
  className,
  style,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  eager = false,
  onClick,
  clickable = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [useSrcSet, setUseSrcSet] = useState(true)
  const imgRef = useRef(null)

  const webpSrcSet = webpSrc ? generateSrcSet(webpSrc, 'webp') : ''
  const fallbackSrcSet = fallbackSrc ? generateSrcSet(fallbackSrc, 'png') : ''

  // Image may already be complete (cached) before React attaches onLoad
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalHeight !== 0) setIsLoaded(true)
  }, [])

  const handleError = () => {
    // Retry with the plain fallback if a srcset variant failed
    if (useSrcSet) {
      setUseSrcSet(false)
      return
    }
    setIsLoaded(true)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
      onClick={onClick}
    >
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            zIndex: 1
          }}
        />
      )}
      <picture
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        style={{
          ...style,
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      >
        {useSrcSet && webpSrcSet && (
          <source srcSet={webpSrcSet} type='image/webp' sizes={sizes} />
        )}
        <img
          ref={imgRef}
          src={fallbackSrc}
          srcSet={useSrcSet ? fallbackSrcSet : undefined}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding='async'
          fetchpriority={eager ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.2s',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            cursor: clickable ? 'zoom-in' : 'default'
          }}
        />
      </picture>
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
    </div>
  )
}
