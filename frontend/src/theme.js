/**
 * AgentRate - Centralized Theme & Color System
 * 
 * Ultra-Professional Real Estate Platform Colors
 * 
 * Update this file to change colors across the entire application.
 * All components should import from here instead of using hardcoded Tailwind classes.
 */

// ==================== PRIMARY COLORS ====================

export const colors = {
  // Primary Navy Blue (Trust, Authority, Main Actions)
  primary: {
    bg: 'bg-blue-800',
    bgHover: 'hover:bg-blue-900',
    bgDark: 'dark:bg-blue-600',
    bgDarkHover: 'dark:hover:bg-blue-700',
    text: 'text-blue-800',
    textHover: 'hover:text-blue-900',
    textDark: 'dark:text-blue-400',
    border: 'border-blue-800',
    borderDark: 'dark:border-blue-500',
    ring: 'ring-blue-800',
  },

  // Success Green (Publish, Verified, Success States)
  success: {
    bg: 'bg-emerald-700',
    bgHover: 'hover:bg-emerald-800',
    bgDark: 'dark:bg-emerald-600',
    bgDarkHover: 'dark:hover:bg-emerald-700',
    text: 'text-emerald-700',
    textHover: 'hover:text-emerald-800',
    textDark: 'dark:text-emerald-400',
    border: 'border-emerald-700',
    bgLight: 'bg-emerald-50',
    bgLightDark: 'dark:bg-emerald-900/20',
  },

  // Secondary Slate (Neutral, Supporting Elements)
  secondary: {
    bg: 'bg-slate-600',
    bgHover: 'hover:bg-slate-700',
    bgDark: 'dark:bg-slate-500',
    bgDarkHover: 'dark:hover:bg-slate-400',
    text: 'text-slate-600',
    textDark: 'dark:text-slate-400',
    border: 'border-slate-300',
    borderDark: 'dark:border-slate-700',
  },

  // Teal Accent (Modern, Secondary Actions)
  teal: {
    bg: 'bg-teal-700',
    bgHover: 'hover:bg-teal-800',
    bgDark: 'dark:bg-teal-600',
    text: 'text-teal-700',
    textDark: 'dark:text-teal-400',
    bgLight: 'bg-teal-50',
    bgLightDark: 'dark:bg-teal-900/20',
  },

  // Muted Gold (Stars, Premium, Ratings) - Use Sparingly
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

  // Warning Orange (Use for Drafts, Pending)
  warning: {
    bg: 'bg-orange-700',
    bgHover: 'hover:bg-orange-800',
    bgDark: 'dark:bg-orange-600',
    text: 'text-orange-700',
    textDark: 'dark:text-orange-400',
    bgLight: 'bg-orange-50',
    bgLightDark: 'dark:bg-orange-900/20',
  },

  // Info Blue
  info: {
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-700',
    text: 'text-blue-600',
    textDark: 'dark:text-blue-400',
    bgLight: 'bg-blue-50',
    bgLightDark: 'dark:bg-blue-900/20',
  },
};

// ==================== BUTTON STYLES ====================

export const buttons = {
  // Primary Button (Main CTAs - Navy Blue)
  primary: `${colors.primary.bg} ${colors.primary.bgHover} ${colors.primary.bgDark} ${colors.primary.bgDarkHover} text-white`,
  
  // Success Button (Publish, Verify, Complete - Green)
  success: `${colors.success.bg} ${colors.success.bgHover} ${colors.success.bgDark} ${colors.success.bgDarkHover} text-white`,
  
  // Secondary Button (Outlined)
  secondary: `border-2 ${colors.primary.border} ${colors.primary.text} hover:bg-blue-50 ${colors.primary.borderDark} ${colors.primary.textDark} dark:hover:bg-blue-950`,
  
  // Ghost Button (Minimal)
  ghost: `${colors.secondary.text} hover:bg-slate-100 ${colors.secondary.textDark} dark:hover:bg-slate-800`,
  
  // Destructive Button (Delete, Remove)
  destructive: `${colors.error.bg} ${colors.error.bgHover} ${colors.error.bgDark} text-white`,
  
  // Teal Button (Secondary Actions)
  teal: `${colors.teal.bg} ${colors.teal.bgHover} ${colors.teal.bgDark} text-white`,
};

// ==================== BADGE STYLES ====================

export const badges = {
  // Published Status
  published: `${colors.success.bg} ${colors.success.bgDark} text-white`,
  
  // Draft Status
  draft: `${colors.warning.bg} ${colors.warning.bgDark} text-white`,
  
  // Pending Status
  pending: `bg-slate-500 dark:bg-slate-600 text-white`,
  
  // Verified Badge
  verified: `${colors.info.bg} text-white`,
  
  // Featured Badge
  featured: `${colors.teal.bg} text-white`,
  
  // New Badge
  new: `${colors.warning.bg} text-white`,
  
  // Premium Badge
  premium: `${colors.gold.bg} text-white`,
  
  // Info Badge (Outline)
  info: `border ${colors.secondary.border} ${colors.secondary.text} ${colors.secondary.textDark}`,
  
  // Success Outline
  successOutline: `border ${colors.success.border} ${colors.success.text} ${colors.success.textDark}`,
};

// ==================== TEXT STYLES ====================

export const text = {
  // Primary heading text
  primary: 'text-slate-900 dark:text-slate-100',
  
  // Secondary text
  secondary: 'text-slate-600 dark:text-slate-400',
  
  // Tertiary/muted text
  muted: 'text-slate-500 dark:text-slate-500',
  
  // Accent text (important numbers, highlights)
  accent: colors.primary.text + ' ' + colors.primary.textDark,
  
  // Success text (positive metrics)
  success: colors.success.text + ' ' + colors.success.textDark,
  
  // Error text
  error: colors.error.text + ' ' + colors.error.textDark,
  
  // Warning text
  warning: colors.warning.text + ' ' + colors.warning.textDark,
  
  // Link text
  link: `${colors.primary.text} ${colors.primary.textHover} ${colors.primary.textDark}`,
};

// ==================== BACKGROUND STYLES ====================

export const backgrounds = {
  // Page background
  page: 'bg-white dark:bg-slate-900',
  
  // Surface background (cards)
  surface: 'bg-white dark:bg-slate-800',
  
  // Muted background
  muted: 'bg-slate-50 dark:bg-slate-800',
  
  // Hover background
  hover: 'hover:bg-slate-50 dark:hover:bg-slate-700',
  
  // Primary light (for icon backgrounds)
  primaryLight: 'bg-blue-100 dark:bg-blue-900/30',
  
  // Success light
  successLight: colors.success.bgLight + ' ' + colors.success.bgLightDark,
  
  // Warning light
  warningLight: colors.warning.bgLight + ' ' + colors.warning.bgLightDark,
  
  // Error light
  errorLight: colors.error.bgLight + ' ' + colors.error.bgLightDark,
  
  // Info light
  infoLight: colors.info.bgLight + ' ' + colors.info.bgLightDark,
  
  // Teal light
  tealLight: colors.teal.bgLight + ' ' + colors.teal.bgLightDark,
};

// ==================== BORDER STYLES ====================

export const borders = {
  // Default border
  default: 'border-slate-200 dark:border-slate-700',
  
  // Primary border
  primary: colors.primary.border + ' ' + colors.primary.borderDark,
  
  // Success border
  success: colors.success.border,
  
  // Error border
  error: colors.error.border,
  
  // Warning border
  warning: 'border-orange-600',
};

// ==================== ICON BACKGROUNDS ====================

export const iconBackgrounds = {
  primary: backgrounds.primaryLight,
  success: backgrounds.successLight,
  warning: backgrounds.warningLight,
  error: backgrounds.errorLight,
  info: backgrounds.infoLight,
  teal: backgrounds.tealLight,
  gold: colors.gold.bgLight + ' ' + colors.gold.bgLightDark,
};

// ==================== STAR RATING ====================

export const stars = {
  filled: `${colors.gold.fill} ${colors.gold.text}`,
  empty: 'text-slate-300 dark:text-slate-600',
};

// ==================== COMPONENT-SPECIFIC ====================

export const components = {
  // Card hover effect
  cardHover: 'hover:shadow-lg transition-shadow duration-200',
  
  // Input focus
  inputFocus: `focus:${colors.primary.border} focus:${colors.primary.ring}`,
  
  // Preview banner
  previewBanner: `${colors.info.bg} dark:bg-blue-700 text-white`,
  
  // Alert banners
  alertSuccess: backgrounds.successLight + ' ' + colors.success.border + ' ' + colors.success.text,
  alertWarning: backgrounds.warningLight + ' ' + colors.warning.border + ' ' + colors.warning.text,
  alertError: backgrounds.errorLight + ' ' + colors.error.border + ' ' + colors.error.text,
  alertInfo: backgrounds.infoLight + ' ' + colors.info.border + ' ' + colors.info.text,
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Combine multiple theme classes
 * @param  {...string} classes 
 * @returns {string}
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Get button classes based on variant
 * @param {'primary' | 'success' | 'secondary' | 'ghost' | 'destructive' | 'teal'} variant 
 * @returns {string}
 */
export const getButtonClasses = (variant = 'primary') => {
  return buttons[variant] || buttons.primary;
};

/**
 * Get badge classes based on status
 * @param {'published' | 'draft' | 'pending' | 'verified' | 'featured' | 'new' | 'premium'} status 
 * @returns {string}
 */
export const getBadgeClasses = (status) => {
  return badges[status] || badges.info;
};

// ==================== USAGE EXAMPLES ====================

/*
BEFORE (Hardcoded):
<button className="bg-amber-500 hover:bg-amber-600 text-white">
  Click Me
</button>

AFTER (Centralized):
import { buttons } from '@/theme';
<button className={buttons.primary}>
  Click Me
</button>

OR with custom additions:
import { buttons, cn } from '@/theme';
<button className={cn(buttons.primary, "px-4 py-2 rounded")}>
  Click Me
</button>
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
