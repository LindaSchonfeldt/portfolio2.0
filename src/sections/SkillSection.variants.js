// ============================================================================
// Customization variants for SkillSection component
// Use these variants to quickly switch between different styling approaches
// ============================================================================

// ============================================================================
// Color Variants
// ============================================================================

export const colorVariants = {
  // Current default - semi-transparent cards
  default: {
    cardBackground: 'rgba(255, 255, 255, 0.5)',
    cardColor: 'var(--text-main)',
    h3Color: 'var(--primary-green-dark)',
    border: 'none'
  },

  // Light & Minimal with subtle border
  lightMinimal: {
    cardBackground: 'rgba(255, 255, 255, 0.8)',
    cardColor: 'var(--text-main)',
    h3Color: 'var(--primary-green-dark)',
    border: '1px solid var(--primary-green)'
  },

  // Bold & Dark - inverted colors
  boldDark: {
    cardBackground: 'var(--primary-green-dark)',
    cardColor: 'var(--text-light)',
    h3Color: 'var(--accent-orange)',
    border: 'none'
  },

  // Gradient Accent
  gradient: {
    cardBackground: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(199,217,196,0.5) 100%)',
    cardColor: 'var(--text-main)',
    h3Color: 'var(--primary-green-dark)',
    border: 'none'
  },

  // Glassmorphism
  glass: {
    cardBackground: 'rgba(255, 255, 255, 0.25)',
    cardColor: 'var(--text-main)',
    h3Color: 'var(--primary-green-dark)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    backdropFilter: 'blur(10px)'
  }
}

// ============================================================================
// Spacing Variants
// ============================================================================

export const spacingVariants = {
  // Current default
  default: {
    cardPadding: '2rem 1.5rem',
    gridGap: '1.5rem',
    gridGapTablet: '2rem',
    gridGapLaptop: '2.5rem',
    minWidth: '180px'
  },

  // Compact - tighter spacing
  compact: {
    cardPadding: '1.5rem 1rem',
    gridGap: '1rem',
    gridGapTablet: '1.5rem',
    gridGapLaptop: '2rem',
    minWidth: '150px'
  },

  // Spacious - more breathing room
  spacious: {
    cardPadding: '3rem 2rem',
    gridGap: '2rem',
    gridGapTablet: '2.5rem',
    gridGapLaptop: '3rem',
    minWidth: '220px'
  },

  // Asymmetric - more top padding for icons
  asymmetric: {
    cardPadding: '2.5rem 2rem 2rem 2rem',
    gridGap: '1.5rem',
    gridGapTablet: '2rem',
    gridGapLaptop: '2.5rem',
    minWidth: '180px'
  }
}

// ============================================================================
// Border & Shadow Variants
// ============================================================================

export const borderShadowVariants = {
  // Current default - subtle shadow
  default: {
    border: 'none',
    borderRadius: '12px',
    boxShadow: 'none',
    hoverBoxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
  },

  // Solid Border
  solidBorder: {
    border: '2px solid var(--primary-green-dark)',
    borderRadius: '12px',
    boxShadow: 'none',
    hoverBoxShadow: 'none'
  },

  // Elevated Shadow
  elevated: {
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    hoverBoxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
  },

  // Bottom Accent
  bottomAccent: {
    border: 'none',
    borderBottom: '4px solid var(--accent-orange)',
    borderRadius: '12px 12px 8px 8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    hoverBoxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },

  // Neumorphism
  neumorphism: {
    border: 'none',
    borderRadius: '20px',
    boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7)',
    hoverBoxShadow: '12px 12px 24px rgba(0, 0, 0, 0.15), -12px -12px 24px rgba(255, 255, 255, 0.9)',
    background: '#c7d9c4' // Override card background for neumorphism
  }
}

// ============================================================================
// Typography Variants
// ============================================================================

export const typographyVariants = {
  // Current default
  default: {
    h3FontSize: '1.25rem',
    h3FontWeight: '600',
    h3Margin: '0 0 1.5rem 0',
    h3Extra: '',
    liFontSize: '0.95rem',
    liExtra: ''
  },

  // Bold Headers with Underline
  boldUnderline: {
    h3FontSize: '1.5rem',
    h3FontWeight: '700',
    h3Margin: '0 0 1rem 0',
    h3Extra: `
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid var(--accent-orange);
      padding-bottom: 0.5rem;
    `,
    liFontSize: '0.95rem',
    liExtra: ''
  },

  // Condensed List
  condensed: {
    h3FontSize: '1.25rem',
    h3FontWeight: '600',
    h3Margin: '0 0 1rem 0',
    h3Extra: '',
    liFontSize: '0.85rem',
    liExtra: 'font-weight: 500;'
  },

  // Badge Style Items
  badges: {
    h3FontSize: '1.25rem',
    h3FontWeight: '600',
    h3Margin: '0 0 1.5rem 0',
    h3Extra: '',
    liFontSize: '0.85rem',
    liExtra: `
      display: inline-block;
      background: rgba(255, 255, 255, 0.6);
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      margin: 0.25rem;
    `
  }
}

// ============================================================================
// Hover Effect Variants
// ============================================================================

export const hoverVariants = {
  // Current default - lift with shadow
  default: {
    transform: 'translateY(-4px)',
    extra: ''
  },

  // Glow Effect
  glow: {
    transform: 'translateY(-4px)',
    extra: `
      box-shadow: 0 0 20px rgba(255, 153, 0, 0.3);
      border-color: var(--accent-orange);
    `
  },

  // Tilt Effect
  tilt: {
    transform: 'perspective(1000px) rotateX(5deg) rotateY(-5deg)',
    extra: ''
  },

  // Border Grow
  borderGrow: {
    transform: 'none',
    extra: `
      border-width: 4px;
      padding: calc(2rem - 2px) calc(1.5rem - 2px);
    `
  },

  // Background Shift & Scale
  backgroundShift: {
    transform: 'translateY(-4px) scale(1.02)',
    extra: 'background-color: rgba(255, 255, 255, 0.9);'
  },

  // Scale Only
  scale: {
    transform: 'scale(1.05)',
    extra: ''
  }
}

// ============================================================================
// Helper function to generate CSS from variants
// ============================================================================

export const generateVariantCSS = (variants) => {
  const {
    color = 'default',
    spacing = 'default',
    borderShadow = 'default',
    typography = 'default',
    hover = 'default'
  } = variants

  const colorConfig = colorVariants[color]
  const spacingConfig = spacingVariants[spacing]
  const borderConfig = borderShadowVariants[borderShadow]
  const typoConfig = typographyVariants[typography]
  const hoverConfig = hoverVariants[hover]

  return {
    container: {
      gap: spacingConfig.gridGap,
      gapTablet: spacingConfig.gridGapTablet,
      gapLaptop: spacingConfig.gridGapLaptop,
      minWidth: spacingConfig.minWidth
    },
    card: {
      background: borderConfig.background || colorConfig.cardBackground,
      color: colorConfig.cardColor,
      padding: spacingConfig.cardPadding,
      border: colorConfig.border !== 'none' ? colorConfig.border : borderConfig.border,
      borderBottom: borderConfig.borderBottom,
      borderRadius: borderConfig.borderRadius,
      boxShadow: borderConfig.boxShadow,
      backdropFilter: colorConfig.backdropFilter
    },
    h3: {
      color: colorConfig.h3Color,
      fontSize: typoConfig.h3FontSize,
      fontWeight: typoConfig.h3FontWeight,
      margin: typoConfig.h3Margin,
      extra: typoConfig.h3Extra
    },
    li: {
      fontSize: typoConfig.liFontSize,
      extra: typoConfig.liExtra
    },
    hover: {
      transform: hoverConfig.transform,
      boxShadow: borderConfig.hoverBoxShadow,
      extra: hoverConfig.extra
    }
  }
}

// ============================================================================
// Pre-defined Combo Variants
// ============================================================================

export const comboVariants = {
  // Clean & Modern (current)
  cleanModern: {
    color: 'default',
    spacing: 'default',
    borderShadow: 'default',
    typography: 'default',
    hover: 'default'
  },

  // Professional
  professional: {
    color: 'lightMinimal',
    spacing: 'spacious',
    borderShadow: 'solidBorder',
    typography: 'boldUnderline',
    hover: 'scale'
  },

  // Playful
  playful: {
    color: 'gradient',
    spacing: 'default',
    borderShadow: 'bottomAccent',
    typography: 'badges',
    hover: 'glow'
  },

  // Dark Mode
  dark: {
    color: 'boldDark',
    spacing: 'default',
    borderShadow: 'elevated',
    typography: 'default',
    hover: 'backgroundShift'
  },

  // Minimal Glass
  minimalGlass: {
    color: 'glass',
    spacing: 'spacious',
    borderShadow: 'elevated',
    typography: 'condensed',
    hover: 'tilt'
  },

  // Compact Pro
  compactPro: {
    color: 'lightMinimal',
    spacing: 'compact',
    borderShadow: 'solidBorder',
    typography: 'condensed',
    hover: 'borderGrow'
  }
}
