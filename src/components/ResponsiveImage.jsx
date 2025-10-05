import { useEffect, useRef, useState } from 'react'

const ResponsiveImage = ({
  webpSrc,
  fallbackSrc,
  alt,
  className,
  style,
  sizes = '(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px'
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
  }, [])

  const webpSrcSet = generateSrcSet(webpSrc)
  const fallbackSrcSet = generateSrcSet(fallbackSrc)

  return (
    <picture
      ref={pictureRef}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={style}
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
          objectPosition: 'center'
        }}
      />
    </picture>
  )
}

export default ResponsiveImage
