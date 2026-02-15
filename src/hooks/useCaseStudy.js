import { useCallback } from 'react'
import projectsData from '../data/projects.json'

/**
 * Hook to get project details and check if it has case study details
 * @param {string|number} projectIdOrSlug - The project ID or slug
 * @returns {Object} Project data or null if not found
 */
export function useProjectCaseStudy(projectIdOrSlug) {
  const project = projectsData.projects.find(
    (p) =>
      p.slug === projectIdOrSlug ||
      p.id === parseInt(projectIdOrSlug) ||
      p.id.toString() === projectIdOrSlug
  )

  if (!project || !project.hasDetail) {
    return null
  }

  return project
}

/**
 * Get all projects with case studies
 * @returns {Array} Array of projects that have hasDetail: true
 */
export function useCaseStudyProjects() {
  return projectsData.projects.filter((p) => p.hasDetail === true)
}

/**
 * Convert project data to case study format
 * @param {Object} project - Project data
 * @returns {Object} Case study formatted data
 */
export function useFormatProjectToCaseStudy(project) {
  const splitParagraphs = (text) =>
    text
      .split(/\n\s*\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)

  const toArray = (value) => {
    if (!value) return []

    if (typeof value === 'string') {
      return splitParagraphs(value)
    }

    if (Array.isArray(value)) {
      return value
        .flatMap((item) =>
          typeof item === 'string' ? splitParagraphs(item) : [item]
        )
        .filter(Boolean)
    }

    return [value]
  }

  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'Recent'
    const [year, month] = dateString.split('-')
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    return `${monthNames[parseInt(month) - 1] || ''} ${year}`
  }, [])

  const generateSections = useCallback((proj) => {
    const sections = []
    const titles = proj.sectionTitles || {}
    const defaultTitles = {
      problem: 'The Problem',
      insight: 'Key Insight',
      approach: 'Approach',
      results: 'Results & Impact',
      prototype: 'Prototype',
      reflection: 'Reflection'
    }

    if (proj.challenges || proj.problem) {
      const problemData = proj.problem || proj.challenges
      const isObject =
        typeof problemData === 'object' && !Array.isArray(problemData)
      sections.push({
        eyebrow: 'Context',
        title: titles.problem || defaultTitles.problem,
        body: toArray(isObject ? problemData.text : problemData),
        image: isObject ? problemData.image : undefined,
        alt: isObject ? problemData.alt : undefined
      })
    }

    if (proj.insight) {
      const insightData = proj.insight
      const isObject =
        typeof insightData === 'object' && !Array.isArray(insightData)
      sections.push({
        eyebrow: 'Analysis',
        title: titles.insight || defaultTitles.insight,
        body: toArray(isObject ? insightData.text : insightData),
        image: isObject ? insightData.image : undefined,
        alt: isObject ? insightData.alt : undefined
      })
    }

    if (proj.approach || proj.solution) {
      const approachData = proj.approach || proj.solution
      const isObject =
        typeof approachData === 'object' && !Array.isArray(approachData)
      sections.push({
        eyebrow: 'Approach',
        title: titles.approach || defaultTitles.approach,
        body: toArray(isObject ? approachData.text : approachData),
        image: isObject ? approachData.image : undefined,
        alt: isObject ? approachData.alt : undefined
      })
    }

    if (proj.prototypeEmbed || proj.prototype) {
      const prototypeBody = toArray(proj.prototypeBody)
      sections.push({
        eyebrow: 'Prototype',
        title: titles.prototype || defaultTitles.prototype,
        embed: proj.prototypeEmbed || proj.prototype,
        body: prototypeBody.length ? prototypeBody : undefined,
        ctaLabel: proj.prototypeCtaLabel || 'Open in Figma',
        ctaUrl: proj.prototype || proj.prototypeEmbed
      })
    }

    if (proj.images && proj.images.length > 0) {
      // If project has explicit heroImage, use all images for sections
      // Otherwise, skip first image (it's used as hero)
      const startIndex = proj.heroImage ? 0 : 1
      const imagesToProcess = proj.images.slice(startIndex)

      imagesToProcess.forEach((image, index) => {
        // Support both string paths and image objects
        const isImageObject = typeof image === 'object' && image !== null
        sections.push({
          eyebrow: isImageObject ? image.eyebrow : `Example ${index + 1}`,
          title: isImageObject ? image.title || proj.title : proj.title,
          body:
            isImageObject && image.description
              ? toArray(image.description)
              : undefined,
          image: isImageObject ? image.src : image,
          alt: isImageObject ? image.alt : proj.title
        })
      })
    }

    if (proj.outcome) {
      sections.push({
        eyebrow: 'Outcome',
        title: titles.results || defaultTitles.results,
        body: toArray(proj.outcome)
      })
    }

    if (proj.reflection) {
      sections.push({
        eyebrow: 'Reflection',
        title: titles.reflection || defaultTitles.reflection,
        body: toArray(proj.reflection)
      })
    }

    if (proj.disclaimer) {
      sections.push({
        eyebrow: 'Disclaimer',
        title: 'Note',
        body: toArray(proj.disclaimer),
        isDisclaimer: true
      })
    }

    return sections.length > 0
      ? sections
      : [
          {
            eyebrow: 'Overview',
            title: proj.title,
            body: [proj.fullDescription || proj.description]
          }
        ]
  }, [])

  if (!project) return null

  return {
    title: project.title,
    subtitle: project.fullDescription || project.description,
    role: project.role || 'Developer',
    client: project.client,
    timeline: formatDate(project.date),
    tools: project.technologies || [],
    heroImage: project.heroImage
      ? `/images/${project.heroImage}.webp`
      : project.images?.[0] || `/images/${project.image}.webp`,
    heroAlt: project.heroAlt || project.alt,
    sections: generateSections(project),
    challenges: project.challenges
  }
}
