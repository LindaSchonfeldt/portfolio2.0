export default function CaseStudyPage({
  title,
  subtitle,
  role,
  timeline,
  tools,
  heroImage,
  sections
}) {
  return (
    <article className='case-study'>
      <CaseHero
        title={title}
        subtitle={subtitle}
        role={role}
        timeline={timeline}
        tools={tools}
        heroImage={heroImage}
      />

      {sections.map((section, index) => (
        <CaseSection key={index} {...section} />
      ))}
    </article>
  )
}
