/**
 * AgentRate - Minimalist Theme System
 * 
 * Stripe-Inspired Monochrome + Muted Green Accent
 * 
 * Philosophy: Let properties and agents be the hero. UI disappears.
 * Update this file to change colors across the entire application.
 */

// ==================== PRIMARY COLORS ====================

export const colors = {
  // Primary Black (Text, Headings, Main Elements)
  primary: {
    bg: 'bg-black',
    bgHover: 'hover:bg-gray-900',
    bgDark: 'dark:bg-white',
    bgDarkHover: 'dark:hover:bg-gray-100',
    text: 'text-black',
    textHover: 'hover:text-gray-900',
    textDark: 'dark:text-white',
    border: 'border-black',
    borderDark: 'dark:border-white',
    ring: 'ring-black',
  },

  // Accent Green (CTAs, Success, Verified) - Muted, Professional
  accent: {
    bg: 'bg-green-700',
    bgHover: 'hover:bg-green-800',
    bgDark: 'dark:bg-green-500',
    bgDarkHover: 'dark:hover:bg-green-600',
    text: 'text-green-700',
    textHover: 'hover:text-green-800',
    textDark: 'dark:text-green-500',
    border: 'border-green-700',
    bgLight: 'bg-green-50',
    bgLightDark: 'dark:bg-green-900/20',
  },

  // Secondary Gray (Supporting Elements)
  secondary: {
    bg: 'bg-gray-700',
    bgHover: 'hover:bg-gray-800',
    bgDark: 'dark:bg-gray-300',
    bgDarkHover: 'dark:hover:bg-gray-200',
    text: 'text-gray-700',
    textDark: 'dark:text-gray-300',
    border: 'border-gray-300',
    borderDark: 'dark:border-gray-700',
  },

  // Muted Gold (Stars, Ratings ONLY)
  gold: {
    text: 'text-yellow-600',
    textDark: 'dark:text-yellow-500',
    fill: 'fill-yellow-600',
    fillDark: 'dark:fill-yellow-500',
    bg: 'bg-yellow-600',
    bgLight: 'bg-yellow-50',
    bgLightDark: 'dark:bg-yellow-900/20',
  },

  // Error/Destructive Red
  error: {
    bg: 'bg-red-700',
    bgHover: 'hover:bg-red-800',
    bgDark: 'dark:bg-red-600',
    text: 'text-red-700',
    textDark: 'dark:text-red-400',
    border: 'border-red-700',
    bgLight: 'bg-red-50',
    bgLightDark: 'dark:bg-red-900/20',
  },

  // Warning Gray (Drafts, Pending)
  warning: {
    bg: 'bg-gray-500',
    bgHover: 'hover:bg-gray-600',
    bgDark: 'dark:bg-gray-600',
    text: 'text-gray-600',
    textDark: 'dark:text-gray-400',
    bgLight: 'bg-gray-100',
    bgLightDark: 'dark:bg-gray-800',
  },
};

// ==================== BUTTON STYLES ====================

export const buttons = {
  // Primary Button (Main CTAs - Muted Green)
  primary: `${colors.accent.bg} ${colors.accent.bgHover} ${colors.accent.bgDark} ${colors.accent.bgDarkHover} text-white hover:text-white`,
  
  // Secondary Button (Outlined Black)
  secondary: `border-2 ${colors.primary.border} ${colors.primary.text} hover:bg-black hover:text-white ${colors.primary.borderDark} ${colors.primary.textDark} dark:hover:bg-white dark:hover:text-black`,
  
  // Ghost Button (Minimal)
  ghost: `text-gray-600 hover:text-black hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800`,
  
  // Destructive Button (Delete, Remove)
  destructive: `${colors.error.bg} ${colors.error.bgHover} ${colors.error.bgDark} text-white hover:text-white`,
  
  // Black Button (Alternative CTA)
  black: `bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black hover:text-white dark:hover:text-black`,
};

// ==================== BADGE STYLES ====================

export const badges = {
  // Published Status (Green)
  published: `${colors.accent.bg} ${colors.accent.bgDark} text-white`,
  
  // Draft Status (Gray)
  draft: `${colors.warning.bg} ${colors.warning.bgDark} text-white`,
  
  // Pending Status (Gray)
  pending: `bg-gray-500 dark:bg-gray-600 text-white`,
  
  // Verified Badge (Green)
  verified: `${colors.accent.bg} text-white`,
  
  // Featured Badge (Black)
  featured: `bg-black dark:bg-white text-white dark:text-black`,
  
  // New Badge (Gray)
  new: `bg-gray-800 dark:bg-gray-200 text-white dark:text-black`,
  
  // Info Badge (Outline)
  info: `border ${colors.secondary.border} ${colors.secondary.text} ${colors.secondary.textDark}`,
  
  // Success Outline (Green)
  successOutline: `border ${colors.accent.border} ${colors.accent.text} ${colors.accent.textDark}`,
};

// ==================== TEXT STYLES ====================

export const text = {
  // Primary heading text (Pure Black/White)
  primary: 'text-black dark:text-white',
  
  // Secondary text (Dark Gray)
  secondary: 'text-gray-700 dark:text-gray-300',
  
  // Tertiary/muted text (Medium Gray)
  muted: 'text-gray-500 dark:text-gray-500',
  
  // Accent text (Green - important highlights)
  accent: colors.accent.text + ' ' + colors.accent.textDark,
  
  // Success text (Green)
  success: colors.accent.text + ' ' + colors.accent.textDark,
  
  // Error text
  error: colors.error.text + ' ' + colors.error.textDark,
  
  // Warning text (Gray)
  warning: colors.warning.text + ' ' + colors.warning.textDark,
  
  // Link text (Black with underline)
  link: `${colors.primary.text} hover:underline ${colors.primary.textDark}`,
};

// ==================== BACKGROUND STYLES ====================

export const backgrounds = {
  // Page background
  page: 'bg-white dark:bg-[#0A0A0A]',
  
  // Surface background (cards)
  surface: 'bg-white dark:bg-[#0F0F0F]',
  
  // Muted background
  muted: 'bg-gray-50 dark:bg-gray-900',
  
  // Hover background
  hover: 'hover:bg-gray-50 dark:hover:bg-gray-800',
  
  // Primary light (for icon backgrounds)
  primaryLight: 'bg-gray-100 dark:bg-gray-800',
  
  // Accent light (Green backgrounds)
  accentLight: colors.accent.bgLight + ' ' + colors.accent.bgLightDark,
  
  // Warning light
  warningLight: colors.warning.bgLight + ' ' + colors.warning.bgLightDark,
  
  // Error light
  errorLight: colors.error.bgLight + ' ' + colors.error.bgLightDark,
};

// ==================== BORDER STYLES ====================

export const borders = {
  // Default border (Light Gray)
  default: 'border-gray-200 dark:border-gray-800',
  
  // Primary border (Black)
  primary: colors.primary.border + ' ' + colors.primary.borderDark,
  
  // Accent border (Green)
  accent: colors.accent.border,
  
  // Error border
  error: colors.error.border,
  
  // Light border (Very subtle)
  light: 'border-gray-100 dark:border-gray-900',
};

// ==================== ICON BACKGROUNDS ====================

export const iconBackgrounds = {
  primary: backgrounds.primaryLight,
  accent: backgrounds.accentLight,
  warning: backgrounds.warningLight,
  error: backgrounds.errorLight,
  gold: colors.gold.bgLight + ' ' + colors.gold.bgLightDark,
};

// ==================== STAR RATING ====================

export const stars = {
  filled: `${colors.gold.fill} ${colors.gold.text}`,
  empty: 'text-gray-300 dark:text-gray-600',
};

// ==================== COMPONENT-SPECIFIC ====================

export const components = {
  // Card hover effect (Subtle)
  cardHover: 'hover:shadow-md transition-shadow duration-200',
  
  // Input focus (Black ring)
  inputFocus: `focus:${colors.primary.border} focus:${colors.primary.ring}`,
  
  // Preview banner (Green)
  previewBanner: `${colors.accent.bg} dark:bg-green-600 text-white`,
  
  // Alert banners
  alertSuccess: backgrounds.accentLight + ' ' + colors.accent.border + ' ' + colors.accent.text,
  alertWarning: backgrounds.warningLight + ' ' + colors.warning.border + ' ' + colors.warning.text,
  alertError: backgrounds.errorLight + ' ' + colors.error.border + ' ' + colors.error.text,
  alertInfo: 'bg-gray-50 border-gray-300 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300',
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Combine multiple theme classes
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Get button classes based on variant
 */
export const getButtonClasses = (variant = 'primary') => {
  return buttons[variant] || buttons.primary;
};

/**
 * Get badge classes based on status
 */
export const getBadgeClasses = (status) => {
  return badges[status] || badges.info;
};

// ==================== USAGE EXAMPLES ====================

/*
MINIMALIST STRIPE-INSPIRED SYSTEM:

PRIMARY:
- 90% Black/White/Gray (UI should disappear)
- 8% Natural color (property photos, agent headshots)
- 2% Muted Green (success, CTAs, verified)

EXAMPLES:

Button (Primary):
<button className={buttons.primary}>
  List Your Agency
</button>

Button (Outlined):
<button className={buttons.secondary}>
  View Profile
</button>

Text:
<h1 className={text.primary}>Find Your Perfect Agent</h1>
<p className={text.secondary}>Browse verified agents...</p>

Badge:
<span className={badges.verified}>Verified</span>

Card:
<div className={cn(backgrounds.surface, borders.default, "rounded-lg p-6")}>
  Content
</div>
*/

export default {
  colors,
  buttons,
  badges,
  text,
  backgrounds,
  borders,
  iconBackgrounds,
  stars,
  components,
  cn,
  getButtonClasses,
  getBadgeClasses,
};
