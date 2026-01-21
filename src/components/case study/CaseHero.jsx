export function CaseHero({
  title,
  subtitle,
  role,
  timeline,
  tools,
  heroImage
}) {
  return (
    <header className='case-hero'>
      <div className='case-meta'>
        <h1>{title}</h1>
        <p className='subtitle'>{subtitle}</p>

        <ul className='meta'>
          <li>
            <strong>Role:</strong> {role}
          </li>
          <li>
            <strong>Timeline:</strong> {timeline}
          </li>
          <li>
            <strong>Tools:</strong> {tools.join(', ')}
          </li>
        </ul>
      </div>

      {heroImage && <img src={heroImage} alt={`${title} hero`} />}
    </header>
  )
}
