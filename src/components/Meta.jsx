import { useEffect } from 'react'

function Meta({ title, description, image }) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title
    } else {
      document.title = 'Linda Schönfeldt'
    }

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content =
      description ||
      'Linda Schönfeldt portfolio website showcasing UX & frontend development skills'

    // Update or create og:title
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.content = title || 'Linda Schönfeldt Portfolio'

    // Update or create og:description
    let ogDescription = document.querySelector(
      'meta[property="og:description"]'
    )
    if (!ogDescription) {
      ogDescription = document.createElement('meta')
      ogDescription.setAttribute('property', 'og:description')
      document.head.appendChild(ogDescription)
    }
    ogDescription.content = description || 'Linda Schönfeldt portfolio website'

    // Update or create og:image if provided
    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]')
      if (!ogImage) {
        ogImage = document.createElement('meta')
        ogImage.setAttribute('property', 'og:image')
        document.head.appendChild(ogImage)
      }
      ogImage.content = image
    }
  }, [title, description, image])

  return null
}

export default Meta
