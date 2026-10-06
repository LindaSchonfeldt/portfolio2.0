import styled from 'styled-components'

import { buttonBase } from '../styles/mixins'

export const Button = ({
  label,
  icon: Icon,
  iconOnly = false,
  url,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) => {
  const content = (
    <>
      {Icon && <Icon aria-hidden='true' />}
      {!iconOnly && label}
    </>
  )

  // Icon-only buttons still need an accessible name: the label moves to
  // aria-label and a tooltip instead of being rendered as text
  const iconOnlyProps = iconOnly ? { 'aria-label': label, title: label } : {}

  // If url is provided, render as a link
  if (url) {
    // Check if it's a PDF download
    const isPDF = url.toLowerCase().endsWith('.pdf')

    return (
      <StyledButton
        as='a'
        href={disabled ? undefined : url}
        target='_blank'
        rel='noopener noreferrer'
        download={isPDF && !disabled ? true : undefined}
        $variant={variant}
        $disabled={disabled}
        $hasIcon={Boolean(Icon)}
        $iconOnly={iconOnly}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        {...iconOnlyProps}
        {...props}
      >
        {content}
      </StyledButton>
    )
  }
  // Otherwise render as a button
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      $variant={variant}
      disabled={disabled}
      $disabled={disabled}
      $hasIcon={Boolean(Icon)}
      $iconOnly={iconOnly}
      {...iconOnlyProps}
      {...props}
    >
      {content}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  ${buttonBase}
  min-width: 120px;
  margin-bottom: 0.5rem;

  /* Icon next to the label */
  ${({ $hasIcon }) =>
    $hasIcon &&
    `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      /* Scale any icon library (react-icons, lucide) with font-size */
      svg {
        width: 1em;
        height: 1em;
        flex-shrink: 0;
      }
    `}

  /* Icon only: square, sized to the icon */
  ${({ $iconOnly }) =>
    $iconOnly &&
    `
      width: auto;
      min-width: 0;
      padding: 0.6rem;
      font-size: 1.75rem;
      line-height: 0;
    `}

  /* Primary variant (default) */
  ${({ $variant }) =>
    (!$variant || $variant === 'primary') &&
    `
      background-color: var(--primary-green-dark);
      color: var(--text-light);
      border-color: var(--primary-green-dark);

      &:hover {
        background-color: var(--primary-green);
        opacity: 0.9;
      }
    `}

  /* Secondary variant */
  ${({ $variant }) =>
    $variant === 'secondary' &&
    `
      background-color: var(--background-light);
      color: var(--primary-green-dark);
      border-color: var(--primary-green-dark);

      &:hover {
        background-color: var(--primary-green-dark);
        color: var(--text-light);
      }
    `}

  /* Tertiary variant */
  ${({ $variant }) =>
    $variant === 'tertiary' &&
    `
      background-color: transparent;
      color: var(--primary-green-dark);
      border-color: transparent;

      &:hover {
        color: var(--primary-green);
        text-decoration: underline;
      }
    `}

  /* Icon variant */
  ${({ $variant }) =>
    $variant === 'icon' &&
    `
      background-color: transparent;
      color: var(--primary-green-dark);
      border-color: transparent;
      padding: 0.25rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      &:hover {
        color: var(--primary-green);
      }
    `}

  /* Disabled state */
  ${({ $disabled }) =>
    $disabled &&
    `
      background-color: #e0e0e0;
      color: #9e9e9e;
      border-color: #bdbdbd;
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;

      &:hover {
        background-color: #e0e0e0;
        color: #9e9e9e;
        opacity: 0.6;
      }
    `}
`
