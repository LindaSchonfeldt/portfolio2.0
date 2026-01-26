// Helper to generate actions array for project links
export const getProjectActions = (project) => {
  const actions = []
  if (project.github) {
    actions.push({
      label: 'GitHub',
      url: project.github,
      variant: 'secondary'
    })
  }
  if (project.netlify) {
    actions.push({
      label: 'Live Site',
      url: project.netlify,
      variant: 'primary'
    })
  }
  if (project.prototype) {
    actions.push({
      label: 'Prototype',
      url: project.prototype,
      variant: 'secondary'
    })
  }
  if (project.pdf) {
    actions.push({
      label: 'Download PDF',
      url: project.pdf,
      variant: 'secondary'
    })
  }
  return actions
}
