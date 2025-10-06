import styled from 'styled-components'

import SectionContainer from '../components/SectionContainer'
import devices from '../styles/devices'

export const Services = () => {
  return (
    <SectionContainer id='services'>
      <h2>Services</h2>
      <CardContainer>
        <ServiceCard>
          <h3>Web Development</h3>
          <p>
            Building responsive and modern websites using the latest
            technologies.
          </p>
        </ServiceCard>
        <ServiceCard>
          <h3>UI/UX Design</h3>
          <p>
            Designing user-friendly interfaces and experiences for web
            applications.
          </p>
        </ServiceCard>
        <ServiceCard>
          <h3>Consulting</h3>
          <p>
            Providing expert advice on web development and design best
            practices.
          </p>
        </ServiceCard>
      </CardContainer>
    </SectionContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 20px;

  @media ${devices.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`

const ServiceCard = styled.div`
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: var(--color-background);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`
