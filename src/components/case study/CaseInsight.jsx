import styled from 'styled-components'

export function CaseInsight({ children }) {
  return <InsightBox>{children}</InsightBox>
}

const InsightBox = styled.aside`
  padding: var(--gap-md);
  background: rgba(199, 217, 196, 0.15);
  border-left: 4px solid var(--primary-green-dark);
  border-radius: 4px;
  margin: var(--section-gap) 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-main);
  font-style: italic;
`
