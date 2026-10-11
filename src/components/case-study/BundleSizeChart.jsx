import styled from 'styled-components'

import devices from '../../styles/devices'

const measures = [
  { key: 'initial', title: 'Loaded on first visit' },
  { key: 'total', title: 'All JavaScript on the site' }
]

const formatValue = (value, unit) => `${Math.round(value)} ${unit}`

// Change against the first version, e.g. "−21%"
const formatChange = (value, base) => {
  const change = Math.round(((value - base) / base) * 100)
  return `${change > 0 ? '+' : '−'}${Math.abs(change)}%`
}

export function BundleSizeChart({ data }) {
  if (!data?.versions?.length) return null

  const { versions, unit } = data
  const [base] = versions

  // One shared scale for both charts, so bar lengths compare across them
  const max = Math.max(...versions.flatMap((v) => measures.map((m) => v[m.key])))

  return (
    <Figure>
      {/* The bars are a visual layer only, the table below carries the data */}
      <Charts aria-hidden='true'>
        {measures.map(({ key, title }) => (
          <Chart key={key}>
            <ChartTitle>{title}</ChartTitle>
            {versions.map((version, index) => (
              <Row key={version.label}>
                <RowLabel>
                  {version.label}
                  <Muted>{version.date}</Muted>
                </RowLabel>
                <Track>
                  <Bar style={{ width: `${(version[key] / max) * 100}%` }} />
                </Track>
                <RowValue>
                  {formatValue(version[key], unit)}
                  {index > 0 && (
                    <Muted>{formatChange(version[key], base[key])}</Muted>
                  )}
                </RowValue>
              </Row>
            ))}
          </Chart>
        ))}
      </Charts>

      <table className='visually-hidden'>
        <caption>JavaScript size, gzipped, in {unit}</caption>
        <thead>
          <tr>
            <th scope='col'>Version</th>
            {measures.map(({ key, title }) => (
              <th key={key} scope='col'>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {versions.map((version, index) => (
            <tr key={version.label}>
              <th scope='row'>
                {version.label}, {version.date}
              </th>
              {measures.map(({ key }) => (
                <td key={key}>
                  {formatValue(version[key], unit)}
                  {index > 0 && ` (${formatChange(version[key], base[key])})`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Caption>
        Gzipped JavaScript from production builds of each version. Changes are
        compared with the version before the sprint.
      </Caption>
    </Figure>
  )
}

const Figure = styled.figure`
  margin: var(--gap-md) 0 0;
  padding: var(--gap-sm);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  background: var(--gray-100);

  @media ${devices.tablet} {
    padding: var(--gap-md);
  }
`

const Charts = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
`

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
`

const ChartTitle = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary-green-dark);
  margin: 0;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    'label value'
    'track track';
  align-items: center;
  gap: 0.25rem var(--gap-sm);
  font-family: 'Raleway', sans-serif;
  font-size: 0.9rem;
  color: var(--text-main);

  @media ${devices.tablet} {
    grid-template-columns: 9rem 1fr 7rem;
    grid-template-areas: 'label track value';
  }
`

const RowLabel = styled.span`
  grid-area: label;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`

const RowValue = styled.span`
  grid-area: value;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-weight: 600;
  font-variant-numeric: tabular-nums;

  @media ${devices.tablet} {
    align-items: flex-start;
  }
`

const Muted = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  opacity: 0.75;
`

// The baseline the bars grow from
const Track = styled.div`
  grid-area: track;
  border-left: 1px solid var(--text-main);
  padding: 2px 0;
`

const Bar = styled.div`
  height: 20px;
  border-radius: 0 4px 4px 0;
  background: var(--primary-green-dark);
`

const Caption = styled.figcaption`
  margin-top: var(--gap-md);
  font-family: 'Raleway', sans-serif;
  font-size: 0.85rem;
  color: var(--text-main);
`
