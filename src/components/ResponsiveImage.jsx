import { useEffect, useRef, useState } from 'react'

const ResponsiveImage = ({
  webpSrc,
  fallbackSrc,
  alt,
  className,
  style,
  sizes = '(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px',
  eager = false // If true, load immediately without lazy loading
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const pictureRef = useRef(null)

  // Generate srcset from base filename
  const generateSrcSet = (baseSrc) => {
    const ext = baseSrc.split('.').pop()
    const base = baseSrc.replace(`.${ext}`, '')

    return [
      `${base}-small.${ext} 400w`,
      `${base}-medium.${ext} 800w`,
      `${base}.${ext} 1200w`
    ].join(', ')
  }

  useEffect(() => {
    if (!pictureRef.current) return

    const pictureElement = pictureRef.current
    const img = pictureElement.querySelector('img')

    // If eager loading, load immediately without intersection observer
    if (eager) {
      const sources = pictureElement.querySelectorAll('source')

      sources.forEach((source) => {
        const dataSrcset = source.getAttribute('data-srcset')
        if (dataSrcset) {
          source.srcset = dataSrcset
        }
      })

      const dataSrc = img.getAttribute('data-src')
      const dataSrcset = img.getAttribute('data-srcset')

      if (dataSrc) {
        img.src = dataSrc
      }
      if (dataSrcset) {
        img.srcset = dataSrcset
      }

      img.onload = () => setIsLoaded(true)
      return
    }

    // Otherwise use lazy loading with intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const picture = entry.target
          const sources = picture.querySelectorAll('source')
          const img = picture.querySelector('img')

          sources.forEach((source) => {
            const dataSrcset = source.getAttribute('data-srcset')
            if (dataSrcset) {
              source.srcset = dataSrcset
            }
          })

          const dataSrc = img.getAttribute('data-src')
          const dataSrcset = img.getAttribute('data-srcset')

          if (dataSrc) {
            img.src = dataSrc
          }
          if (dataSrcset) {
            img.srcset = dataSrcset
          }

          img.onload = () => setIsLoaded(true)
          observer.unobserve(picture)
        }
      })
    })

    observer.observe(pictureElement)

    return () => {
      if (pictureElement) {
        observer.unobserve(pictureElement)
      }
    }
  }, [eager])

  const webpSrcSet = generateSrcSet(webpSrc)
  const fallbackSrcSet = generateSrcSet(fallbackSrc)

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
