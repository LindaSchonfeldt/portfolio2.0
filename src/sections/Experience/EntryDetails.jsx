import styled from 'styled-components'

import { Button, Tag } from '../../components'
import siteConfig from '../../data/siteConfig.json'

const underConstruction = siteConfig.underConstruction.projectIds

export const EntryDetails = ({ entry }) => (
  <DetailsInner>
    {entry.highlights ? (
      <Highlights>
        {entry.highlights.map((highlight) => {
          const { text, details } =
            typeof highlight === 'string' ? { text: highlight } : highlight
          return (
            <li key={text}>
              {text}
              {details && (
                <ul>
                  {details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </Highlights>
    ) : (
      <Description>{entry.description}</Description>
    )}

    {entry.tech.length > 0 && (
      <TechList aria-label='Tools and methods'>
        {entry.tech.map((item) => (
          <li key={item}>
            <Tag text={item} />
          </li>
        ))}
      </TechList>
    )}

    {entry.links?.length > 0 && (
      <Links>
        {entry.links.map(({ label, url, projectId }) => {
          const comingSoon = underConstruction.includes(projectId)
          return (
            <Button
              key={url}
              label={comingSoon ? `${label} (coming soon)` : label}
              url={url}
              variant='secondary'
              disabled={comingSoon}
            />
          )
        })}
      </Links>
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

  ul {
    margin: 0.4rem 0 0;
    padding-left: 1.2rem;
    list-style-type: circle;
  }

  ul li:last-child {
    margin-bottom: 0;
  }
`

const Description = styled.p`
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
`

// Spacing comes from Tag's own margins, same as elsewhere on the site
const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.75rem;
  margin-top: 0.75rem;
`
