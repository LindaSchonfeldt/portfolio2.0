import { useEffect, useRef, useState } from 'react'

const ResponsiveVideo = ({
  webmSrc,
  mp4Src,
  posterSrc,
  className,
  style,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  preload = 'metadata'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    const videoElement = videoRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target
          const sources = video.querySelectorAll('source')

          sources.forEach((source) => {
            const dataSrc = source.getAttribute('data-src')
            if (dataSrc) {
              source.src = dataSrc
            }
          })

          // Load the video
          video.load()

          video.onloadeddata = () => {
            setIsLoaded(true)
            if (autoPlay) {
              video.play().catch((err) => {
                console.warn('Autoplay prevented:', err)
              })
            }
          }

          observer.unobserve(video)
        }
      })
    })

    observer.observe(videoElement)

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement)
      }
    }
  }, [autoPlay])

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
      <video
        ref={videoRef}
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        style={{
          ...style,
          position: 'relative',
          zIndex: 2,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block'
        }}
        poster={posterSrc}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        preload={preload}
      >
        {webmSrc && <source data-src={webmSrc} type='video/webm' />}
        {mp4Src && <source data-src={mp4Src} type='video/mp4' />}
        Your browser does not support the video tag.
      </video>
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

export default ResponsiveVideo
