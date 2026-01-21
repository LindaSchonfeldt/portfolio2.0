export function CaseSection({ eyebrow, title, body, image, embed }) {
  return (
    <section className='case-section'>
      {eyebrow && <span className='eyebrow'>{eyebrow}</span>}
      {title && <h2>{title}</h2>}

      {body && body.map((p, i) => <p key={i}>{p}</p>)}

      {image && <img src={image} alt={title} />}

      {embed && (
        <div className='embed'>
          <iframe src={embed} title={title} loading='lazy' />
        </div>
      )}
    </section>
  )
}
