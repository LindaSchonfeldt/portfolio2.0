import styled from 'styled-components'

export const HighlightText = ({
  children,
  variant = 'yellow',
  wrap = false,
  ...rest
}) => (
  <StyledSpan $variant={variant} $wrap={wrap} {...rest}>
    {children}
  </StyledSpan>
)

const StyledSpan = styled.span`
  position: relative;
  display: inline-block;
  color: var(--text-main);
  font-weight: 600;
  z-index: 0;
  padding: 4px 4px;
  text-align: center;
  user-select: none;
  white-space: ${({ $wrap }) => ($wrap ? 'normal' : 'nowrap')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 3px 5px 3px 5px;
    background:
      conic-gradient(at 0 100%, rgb(var(--mark-color) / 100%) 1%, #fff0 3%)
        no-repeat 0 0 / auto 120%,
      conic-gradient(
          from 180deg at 100% 0,
          #fff0,
          rgb(var(--mark-color) / 100%) 1%,
          #fff0 4%
        )
        no-repeat 100% 100% / auto 120%,
      linear-gradient(
          var(--mark-bg-angle),
          rgb(var(--mark-color) / 60%),
          rgb(var(--mark-color) / 20%) 75%,
          rgb(var(--mark-color) / 55%)
        )
        no-repeat center / auto;
  }

  ${({ $variant }) =>
    $variant === 'green' &&
    `
      &::before {
        scale: 0.92;
        transform: skew(7deg);
        --mark-color: 91 233 92;
        --mark-bg-angle: 30deg;
      }
    `}

  ${({ $variant }) =>
    $variant === 'red' &&
    `
      &::before {
        rotate: 0.5deg;
        transform: skew(5deg);
        --mark-color: 255 100 185;
        --mark-bg-angle: 150deg;
      }
    `}

  ${({ $variant }) =>
    ($variant === 'yellow' || !$variant) &&
    `
      &::before {
        rotate: 1deg;
        scale: 1.1;
        transform: skew(-5deg);
        --mark-color: 255 232 62;
        --mark-bg-angle: 50deg;
      }
    `}
`
