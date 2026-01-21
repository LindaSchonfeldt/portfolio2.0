# Case Study Template

## 1️⃣ Case Study Structure

### Hero / Overview

- **Title:**
- **Subtitle:**
- **Role:**
- **Timeline:**
- **Tools:**
- **Hero Image:**

### Problem & Context

- **Problem Statement:**
- **Context:**

### Goal & Success Criteria

- **Goal:**
- **Success Criteria:**

### Process & Decisions

- **Process Overview:**
- **Key Decisions:**

### Solution (Prototype / Screens)

- **Prototype Link:**
- **Screenshots:**

### Interaction Highlight

- **Key Interaction:**

### Constraints & Trade-offs

- **Constraints:**
- **Trade-offs:**

### Outcome & Learnings

- **Outcome:**
- **Learnings:**

### What I’d do next

- **Next Steps:**

---

## 2️⃣ Reusable React Architecture

### Component Structure

```
CaseStudyPage
 ├─ CaseHero
 ├─ CaseSection
 │   ├─ Text
 │   ├─ Image / Embed
 ├─ CaseGallery
 ├─ CasePrototypeEmbed
 ├─ CaseReflection
```

## 3️⃣ Reusable React Template

### CaseStudyPage.jsx

```jsx
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
```

### CaseHero.jsx

```jsx
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
```

### CaseSection.jsx

```jsx
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
```

## 4️⃣ Example Case Study Data

```jsx
const goFishCase = {
  title: 'GoFish – Low-friction Product Reviews',
  subtitle: 'Designing a swipe-based review flow to reduce user effort',
  role: 'UX Designer & Frontend Developer',
  timeline: '2 weeks',
  tools: ['Figma', 'React', 'UX Research'],

  sections: [
    {
      eyebrow: 'Problem',
      title: 'Review fatigue reduces completion rates',
      body: [
        'Traditional review forms require too much effort for low-stakes feedback.',
        'Users often abandon reviews before completion.'
      ]
    },
    {
      eyebrow: 'Goal',
      title: 'Make feedback fast, intuitive, and rewarding',
      body: [
        'Reduce friction by replacing form-based reviews with swipe gestures.',
        'Maintain clarity without increasing cognitive load.'
      ]
    },
    {
      eyebrow: 'Solution',
      title: 'Swipe-based review cards',
      body: [
        'Each card represents a single statement.',
        'Users swipe left or right to respond.'
      ],
      embed: 'https://www.figma.com/embed?embed_host=share&url=YOUR_PROTO_LINK'
    },
    {
      eyebrow: 'Constraints',
      title: 'Working within Figma’s interaction model',
      body: [
        'Gesture intent and navigation were handled within a single drag interaction.',
        'This ensured reliable motion while respecting Figma’s limitations.'
      ]
    },
    {
      eyebrow: 'Outcome',
      title: 'Clear feedback with minimal effort',
      body: [
        'The flow reduces decision fatigue.',
        'Users always know how many steps remain.'
      ]
    }
  ]
}
```

## 5️⃣ Why This Template is Strong

- Separates content from layout
- Thinks in systems
- Scales your portfolio without redesigning every page
- Understands both UX narrative and frontend structure

## 6️⃣ Styling Advice

- Generous vertical spacing
- Max-width on text (65–75ch)
- One accent color
- No animations competing with the prototype

## 7️⃣ Optional Additions

```jsx
<CaseInsight>
  Swipe gestures reduce friction, but must be paired with clear affordances for
  first-time users.
</CaseInsight>
```
