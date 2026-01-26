import styled from 'styled-components'

export function CaseSection({ eyebrow, title, body, image, embed }) {
  return (
    <SectionStyled>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && <SectionTitle>{title}</SectionTitle>}

      {body && (
        <ContentBody>
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </ContentBody>
      )}

      {image && <SectionImage src={image} alt={title} />}

      {embed && (
        <EmbedContainer>
          <iframe src={embed} title={title} loading='lazy' />
        </EmbedContainer>
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
  }
`

const SectionImage = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  margin-top: var(--gap-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const EmbedContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  margin-top: var(--gap-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`
