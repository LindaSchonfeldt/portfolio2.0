import { useEffect, useRef, useState } from 'react'

const ResponsiveImage = ({
  webpSrc,
  fallbackSrc,
  alt,
  className,
  style,
  sizes = '(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px',
  eager = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const pictureRef = useRef(null)

  // Generate srcset for both WebP and fallback
  const webpSrcSet = webpSrc
    ? `${webpSrc.replace(
        /\.(webp|png|jpg)$/,
        '-small.webp'
      )} 400w, ${webpSrc.replace(
        /\.(webp|png|jpg)$/,
        '-medium.webp'
      )} 800w, ${webpSrc} 1200w`
    : ''

  const fallbackSrcSet = fallbackSrc
    ? `${fallbackSrc.replace(
        /\.(webp|png|jpg)$/,
        '-small.png'
      )} 400w, ${fallbackSrc.replace(
        /\.(webp|png|jpg)$/,
        '-medium.png'
      )} 800w, ${fallbackSrc} 1200w`
    : ''

  useEffect(() => {
    const picture = pictureRef.current
    if (!picture) return

    const img = picture.querySelector('img')
    if (!img) return

    const loadImage = () => {
      const dataSrc = img.getAttribute('data-src')
      const dataSrcSet = img.getAttribute('data-srcset')

      // If eager loading or if src is not set, load immediately
      if (eager || !img.src || img.src === window.location.href) {
        if (dataSrc) img.src = dataSrc
        if (dataSrcSet) img.srcset = dataSrcSet

        // Also update source elements
        const sources = picture.querySelectorAll('source')
        sources.forEach((source) => {
          const dataSrcSet = source.getAttribute('data-srcset')
          if (dataSrcSet) source.srcset = dataSrcSet
        })

        // Set loaded when image loads or immediately if already cached
        if (img.complete && img.naturalHeight !== 0) {
          setIsLoaded(true)
        } else {
          img.onload = () => setIsLoaded(true)
          img.onerror = () => {
            console.error('Failed to load image:', dataSrc)
            setIsLoaded(true) // Show placeholder
          }
        }

        if (eager) return
      }

      // Lazy loading with IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const dataSrc = img.getAttribute('data-src')
              const dataSrcSet = img.getAttribute('data-srcset')

              if (dataSrc) img.src = dataSrc
              if (dataSrcSet) img.srcset = dataSrcSet

              // Also update source elements
              const sources = picture.querySelectorAll('source')
              sources.forEach((source) => {
                const dataSrcSet = source.getAttribute('data-srcset')
                if (dataSrcSet) source.srcset = dataSrcSet
              })

              img.onload = () => setIsLoaded(true)
              img.onerror = () => {
                console.error('Failed to load image:', dataSrc)
                setIsLoaded(true)
              }

              observer.unobserve(img)
            }
          })
        },
        { rootMargin: '50px' }
      )

      observer.observe(img)

      return () => observer.disconnect()
    }

    loadImage()
  }, [eager])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            zIndex: 1
          }}
        />
      )}
      <picture
        ref={pictureRef}
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
        <source data-srcset={webpSrcSet} type='image/webp' sizes={sizes} />
        <img
          data-src={fallbackSrc}
          data-srcset={fallbackSrcSet}
          sizes={sizes}
          alt={alt}
          fetchpriority={eager ? 'high' : 'auto'}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
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

export default ResponsiveImage
