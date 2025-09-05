import styled from 'styled-components'
import treeSrc from '../assets/tree.svg'

// Create and export the styled img component
export const StyledLogo = styled.img`
  width: ${({ $size }) =>
    $size === 'medium' ? '4rem' : $size === 'large' ? '6rem' : '1.3rem'};
  height: auto;
`

// Create the Logo component that uses StyledLogo
export const Logo = ({ className = '', alt = '', size = 'small' }) => {
  return (
    <StyledLogo src={treeSrc} alt={alt} className={className} $size={size} />
  )
}
