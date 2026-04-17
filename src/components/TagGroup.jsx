import styled from 'styled-components'

import devices from '../styles/devices'
import { Tag } from './Tag'

export const TagGroup = ({ tags }) => {
  return (
    <TagContainer>
      {tags.map((tag, index) => (
        <Tag key={index} text={tag} />
      ))}
    </TagContainer>
  )
}

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${devices.tablet} {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`
