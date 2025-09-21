import Meta from '../components/Meta'
import { ProjectCard } from '../components/ProjectCard'
import SectionContainer from '../components/SectionContainer'
import projectsData from '../data/projects.json'

const Projects = () => {
  return (
    <>
      <Meta
        title='Projects | Linda Schönfeldt Portfolio'
        description="Explore Linda Schönfeldt's projects in web development."
      />
      <SectionContainer id='projects'>
        <h1>Projects</h1>
        {projectsData.code.map((project, idx) => (
          <ProjectCard key={project.id || idx} project={project} />
        ))}
      </SectionContainer>
    </>
  )
}
export default Projects
