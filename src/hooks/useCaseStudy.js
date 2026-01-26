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
      approach: 'Our Approach',
      results: 'Results & Impact',
      prototype: 'Prototype',
      reflection: 'Reflection'
    }

    if (proj.challenges) {
      sections.push({
        eyebrow: 'Context',
        title: titles.problem || defaultTitles.problem,
        body: [proj.challenges]
      })
    }

    if (proj.solution) {
      sections.push({
        eyebrow: 'Approach',
        title: titles.approach || defaultTitles.approach,
        body: [proj.solution]
      })
    }

    if (proj.prototypeEmbed || proj.prototype) {
      sections.push({
        eyebrow: 'Prototype',
        title: titles.prototype || defaultTitles.prototype,
        embed: proj.prototypeEmbed || proj.prototype
      })
    }

    if (proj.images && proj.images.length > 1) {
      proj.images.slice(1).forEach((image, index) => {
        sections.push({
          eyebrow: `Example ${index + 1}`,
          title: proj.title,
          image: image
        })
      })
    }

    if (proj.outcome) {
      sections.push({
        eyebrow: 'Outcome',
        title: titles.results || defaultTitles.results,
        body: [proj.outcome]
      })
    }

    if (proj.reflection) {
      sections.push({
        eyebrow: 'Reflection',
        title: titles.reflection || defaultTitles.reflection,
        body: [proj.reflection]
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
    timeline: formatDate(project.date),
    tools: project.technologies || [],
    heroImage: project.images?.[0] || `/images/${project.image}.webp`,
    sections: generateSections(project),
    challenges: project.challenges
  }
}
