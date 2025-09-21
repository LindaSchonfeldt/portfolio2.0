import { useEffect } from 'react'

const Meta = ({ title, description, image }) => {
  useEffect(() => {
    // Update document title
    document.title = title || 'Linda Schönfeldt'

    // Find or create meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content =
      description ||
      'Linda Schönfeldt portfolio website showcasing frontend development skills'

    // Set other meta tags
    updateOrCreateMeta('og:title', title || 'Linda Schönfeldt Portfolio')
    updateOrCreateMeta(
      'og:description',
      description || 'Linda Schönfeldt portfolio website'
    )
    if (image) {
      updateOrCreateMeta('og:image', image)
    }
  }, [title, description, image])

  const updateOrCreateMeta = (property, content) => {
    let meta = document.querySelector(`meta[property="${property}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
    }
    meta.content = content
  }

  // This component doesn't render anything
  return null
}

export default Meta
