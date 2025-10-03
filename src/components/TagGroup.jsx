import styled from 'styled-components'

// A list of Tags for skills or project tags
import { Tag } from './Tag'

export const TagGroup = ({ tags }) => {
  return (
    <TagContainer>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </TagContainer>
  )
}

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
