import styled from 'styled-components'
import devices from '../../styles/devices'

export function CaseHero({
  title,
  subtitle,
  role,
  timeline,
  tools,
  heroImage,
  heroAlt
}) {
  return (
    <HeaderStyled>
      <MetaContainer>
        <h1>{title}</h1>
        <Subtitle>{subtitle}</Subtitle>

        <MetaList>
          <li>
            <strong>Role:</strong> {role}
          </li>
          <li>
            <strong>Timeline:</strong> {timeline}
          </li>
          <li>
            <strong>Tools:</strong> {tools.join(', ')}
          </li>
        </MetaList>
      </MetaContainer>

      {heroImage && (
        <HeroImage src={heroImage} alt={heroAlt || `${title} hero image`} />
      )}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gap-lg);
  align-items: center;
  margin-bottom: var(--section-gap);
  border-bottom: 1px solid var(--gray-200);
  padding-bottom: var(--gap-lg);

  @media ${devices.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);

  h1 {
    color: var(--text-main);
    margin: 0;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-main);
  margin: 0;
  line-height: 1.7;
  font-weight: 400;
`

const MetaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
  font-size: 0.95rem;
  color: var(--text-main);

  li {
    display: flex;
    gap: 0.5rem;

    strong {
      color: var(--primary-green-dark);
      min-width: 80px;
      font-weight: 600;
    }
  }
`

const HeroImage = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`
