import styled from 'styled-components'

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  justify-items: flex-start;
  align-items: stretch;
  margin: 2rem 0;
  grid-auto-flow: dense;
  max-width: 1600px;
  width: 100%;
`
