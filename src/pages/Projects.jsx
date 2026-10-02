// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

import { Meta, ProjectCard, ProjectGrid, SectionContainer } from '../components'
import projectsData from '../data/projects.json'

const Projects = () => {
  return (
    <>
      <Meta
        title='Projects | Linda Schönfeldt Portfolio'
        description="Explore Linda Schönfeldt's frontend projects in React and TypeScript, and UX case studies with a focus on healthtech and ethical design."
      />
      <motion.div
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <SectionContainer id='projects'>
          <h1>Projects</h1>
          <ProjectGrid>
            {projectsData.projects.map((project, idx) => (
              <ProjectCard
                key={project.id || idx}
                project={project}
                size={project.size || 'medium'}
                eager={idx < 3}
              />
            ))}
          </ProjectGrid>
        </SectionContainer>
      </motion.div>
    </>
  )
}
export default Projects
