import { useEffect, useRef, useState } from 'react'

const LazyImage = ({ src, alt, className, style, onClick, clickable = false }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (!imgRef.current) return

    const imgElement = imgRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          const dataSrc = img.getAttribute('data-src')

          if (dataSrc) {
            img.src = dataSrc
            img.onload = () => setIsLoaded(true)
            observer.unobserve(img)
          }
        }
      })
    })

    observer.observe(imgElement)

    return () => {
      if (imgElement) {
        observer.unobserve(imgElement)
      }
    }
  }, [])

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      onClick={onClick}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s',
        cursor: clickable ? 'zoom-in' : 'default',
        ...style
      }}
    />
  )
}

export default LazyImage
