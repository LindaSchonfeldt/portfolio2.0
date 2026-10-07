import styled from 'styled-components'

export const EntryDetails = ({ entry }) => (
  <DetailsInner>
    {entry.highlights ? (
      <Highlights>
        {entry.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </Highlights>
    ) : (
      <Description>{entry.description}</Description>
    )}

    {entry.tech.length > 0 && (
      <TechList aria-label='Tools and methods'>
        {entry.tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </TechList>
    )}
  </DetailsInner>
)

const DetailsInner = styled.div`
  padding: 0 1.2rem 1.2rem;
`

const Highlights = styled.ul`
  margin: 0 0 1rem;
  padding-left: 1.2rem;

  li {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 0.4rem;
  }
`

const Description = styled.p`
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
`

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: var(--background-green);
    color: var(--primary-green-dark);
  }
`
