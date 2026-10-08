import { LuDownload, LuSquareArrowOutUpRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'
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
  newTab,
  ...props
}) => {
  const isPDF = url?.toLowerCase().endsWith('.pdf')
  const isExternal = /^https?:\/\//i.test(url ?? '')
  // Only external links open in a new tab by default, and they always
  // signal it with an icon so the behaviour is never a surprise
  const opensNewTab = Boolean(url) && !isPDF && (newTab ?? isExternal)
  // PDFs are downloaded, so mark those with a download icon instead
  const isDownload = isPDF && !disabled
  // Icon-only buttons already are their icon, so skip the visual hints there
  const showNewTabIcon = opensNewTab && !iconOnly
  const showDownloadIcon = isDownload && !iconOnly

  const content = (
    <>
      {Icon && <Icon aria-hidden='true' />}
      {!iconOnly && label}
      {showNewTabIcon && (
        <>
          <LuSquareArrowOutUpRight
            aria-hidden='true'
            className='trailingIcon'
          />
          <span className='visually-hidden'>(opens in new tab)</span>
        </>
      )}
      {showDownloadIcon && <LuDownload aria-hidden='true' className='trailingIcon' />}
    </>
  )

  // Icon-only buttons still need an accessible name: the label moves to
  // aria-label and a tooltip instead of being rendered as text
  const iconOnlyProps = iconOnly ? { 'aria-label': label, title: label } : {}

  // aria-label overrides the hidden text above, so repeat the hint there
  const ariaLabel = iconOnlyProps['aria-label'] ?? props['aria-label']
  const newTabProps =
    opensNewTab && ariaLabel
      ? { 'aria-label': `${ariaLabel} (opens in new tab)` }
      : {}

  // Internal routes go through the router so they stay in the same tab
  // without a full page reload
  if (url && url.startsWith('/') && !isPDF && !disabled) {
    return (
      <StyledButton
        as={Link}
        to={url}
        $variant={variant}
        $hasIcon={Boolean(Icon)}
        $iconOnly={iconOnly}
        {...iconOnlyProps}
        {...props}
      >
        {content}
      </StyledButton>
    )
  }

  // If url is provided, render as a link
  if (url) {
    return (
      <StyledButton
        as='a'
        href={disabled ? undefined : url}
        target={opensNewTab ? '_blank' : undefined}
        rel={opensNewTab ? 'noopener noreferrer' : undefined}
        download={isPDF && !disabled ? true : undefined}
        $variant={variant}
        $disabled={disabled}
        $hasIcon={Boolean(Icon) || showNewTabIcon || showDownloadIcon}
        $iconOnly={iconOnly}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        {...iconOnlyProps}
        {...props}
        {...newTabProps}
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

      /* New-tab / download hint is secondary to the label */
      svg.trailingIcon {
        width: 0.85em;
        height: 0.85em;
        margin-left: -0.15rem;
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
