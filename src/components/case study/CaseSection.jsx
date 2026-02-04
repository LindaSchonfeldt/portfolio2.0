import styled from 'styled-components'

import { Button } from '../Button'

export function CaseSection({
  eyebrow,
  title,
  body,
  image,
  alt,
  embed,
  ctaLabel,
  ctaUrl,
  isDisclaimer
}) {
  // Normalize figma prototype URLs to the embeddable format for better sizing/controls
  const embedUrl = embed?.includes('figma.com/proto')
    ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(embed)}`
    : embed

  return (
    <SectionStyled $isDisclaimer={isDisclaimer}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && <SectionTitle>{title}</SectionTitle>}

      {body && (
        <ContentBody $isDisclaimer={isDisclaimer}>
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </ContentBody>
      )}

      {image && <SectionImage src={image} alt={alt || title} />}

      {embedUrl && (
        <EmbedContainer>
          <iframe src={embedUrl} title={title} loading='lazy' allowFullScreen />
        </EmbedContainer>
      )}

      {ctaLabel && ctaUrl && (
        <Actions>
          <Button label={ctaLabel} url={ctaUrl} variant='secondary' />
        </Actions>
      )}
    </SectionStyled>
  )
}

const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md) 0;
  margin-bottom: var(--section-gap);
  scroll-margin-top: 100px;

  ${(props) =>
    props.$isDisclaimer &&
    `
    padding: 1.5rem;
    background: var(--background-light);
    border-radius: 8px;
    border-left: 3px solid var(--primary-green-dark);
  `}
`

const Eyebrow = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary-green-dark);
`

const SectionTitle = styled.h2`
  color: var(--text-main);
  margin: 0;
  line-height: 1.4;
`

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);

  p {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text-main);
    margin: 0;
    ${(props) =>
      props.$isDisclaimer &&
      'font-style: italic; font-size: 0.95rem; opacity: 0.85;'}
  }
`

const SectionImage = styled.img`
  width: 100%;
  object-fit: cover;
  margin-top: var(--gap-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const EmbedContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  margin-top: var(--gap-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  aspect-ratio: 10 / 16;
  min-height: 60vh;
  max-height: 90vh;

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`

const Actions = styled.div`
  margin-top: var(--gap-sm);
`
