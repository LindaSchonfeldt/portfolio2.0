// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

import Meta from '../components/Meta'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectGrid } from '../components/ProjectGrid'
import SectionContainer from '../components/SectionContainer'
import projectsData from '../data/projects.json'

const Projects = () => {
  return (
    <>
      <Meta
        title='Projects | Linda Schönfeldt Portfolio'
        description="Explore Linda Schönfeldt's projects in web development and UX design."
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <SectionContainer id='projects'>
          <h1>Projects</h1>
          <ProjectGrid>
            {projectsData.code.map((project, idx) => (
              <ProjectCard
                key={project.id || idx}
                project={project}
                size={project.size || 'medium'}
                fullRow={idx === 0}
                eager={idx < 2}
              />
            ))}
          </ProjectGrid>
        </SectionContainer>
      </motion.div>
    </>
  )
}
export default Projects
