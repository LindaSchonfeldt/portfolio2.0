import { useCallback } from 'react'
import projectsData from '../data/projects.json'

/**
 * Hook to get project details and check if it has case study details
 * @param {number} projectId - The project ID
 * @returns {Object} Project data or null if not found
 */
export function useProjectCaseStudy(projectId) {
  const project = projectsData.projects.find(
    (p) => p.id === parseInt(projectId)
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

    if (proj.challenges) {
      sections.push({
        eyebrow: 'Challenge',
        title: 'The Problem',
        body: [proj.challenges]
      })
    }

    if (proj.solution) {
      sections.push({
        eyebrow: 'Solution',
        title: 'Our Approach',
        body: [proj.solution]
      })
    }

    if (proj.images && proj.images.length > 1) {
      proj.images.slice(1).forEach((image, index) => {
        sections.push({
          eyebrow: `Screenshot ${index + 1}`,
          title: proj.title,
          image: image
        })
      })
    }

    if (proj.outcome) {
      sections.push({
        eyebrow: 'Outcome',
        title: 'Results & Impact',
        body: [proj.outcome]
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
