/**
 * AgentRate - Complete Design System
 * 
 * Modern Indigo + Teal + Amber Professional Palette
 * 
 * Single source of truth for ALL colors across the application.
 * Change colors here and they update everywhere automatically.
 */

// ==================== COLOR CONSTANTS ====================

export const colors = {
  // Primary - Indigo (Trust, Professional)
  primary: {
    DEFAULT: '#4F46E5',      // indigo-600
    hover: '#4338CA',        // indigo-700
    soft: '#EEF2FF',         // indigo-50
    bg: 'bg-indigo-600',
    bgHover: 'hover:bg-indigo-700',
    bgSoft: 'bg-indigo-50',
    text: 'text-indigo-600',
    textHover: 'hover:text-indigo-700',
    textDark: 'dark:text-indigo-400',
    border: 'border-indigo-600',
    borderDark: 'dark:border-indigo-500',
  },

  // Accent A - Teal (Modern, Fresh)
  teal: {
    DEFAULT: '#14B8A6',      // teal-500
    hover: '#0D9488',        // teal-600
    bg: 'bg-teal-500',
    bgHover: 'hover:bg-teal-600',
    bgDark: 'dark:bg-teal-500',
    text: 'text-teal-500',
    textHover: 'hover:text-teal-600',
    textDark: 'dark:text-teal-400',
    border: 'border-teal-500',
  },

  // Accent B - Amber (Highlights, Attention)
  amber: {
    DEFAULT: '#D97706',      // amber-600
    bg: 'bg-amber-600',
    bgHover: 'hover:bg-amber-700',
    bgDark: 'dark:bg-amber-600',
    text: 'text-amber-600',
    textDark: 'dark:text-amber-500',
    border: 'border-amber-600',
  },

  // Success - Green
  success: {
    DEFAULT: '#16A34A',      // green-600
    bg: 'bg-green-600',
    bgHover: 'hover:bg-green-700',
    bgSoft: 'bg-green-50',
    text: 'text-green-600',
    textDark: 'dark:text-green-500',
    border: 'border-green-600',
  },

  // Warning - Amber
  warning: {
    DEFAULT: '#D97706',      // amber-600
    bg: 'bg-amber-600',
    bgSoft: 'bg-amber-50',
    text: 'text-amber-600',
    textDark: 'dark:text-amber-500',
  },

  // Danger - Red
  danger: {
    DEFAULT: '#DC2626',      // red-600
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-700',
    bgSoft: 'bg-red-50',
    text: 'text-red-600',
    textDark: 'dark:text-red-500',
    border: 'border-red-600',
  },

  // Info - Blue
  info: {
    DEFAULT: '#2563EB',      // blue-600
    bg: 'bg-blue-600',
    bgSoft: 'bg-blue-50',
    text: 'text-blue-600',
    textDark: 'dark:text-blue-400',
  },

  // Neutrals - Slate
  neutral: {
    // Text
    ink: 'text-slate-900 dark:text-gray-200',        // #0F172A / #E5E7EB
    subtext: 'text-slate-700 dark:text-slate-400',   // #334155 / #94A3B8
    muted: 'text-slate-500 dark:text-slate-500',     // #64748B
    
    // Backgrounds
    bg: 'bg-slate-50 dark:bg-[#0B1220]',            // #F8FAFC / #0B1220
    surface: 'bg-white dark:bg-slate-900',          // #FFFFFF / #0F172A
    surfaceAlt: 'bg-slate-100 dark:bg-gray-900',    // #F1F5F9 / #111827
    
    // Borders
    border: 'border-slate-200 dark:border-gray-800', // #E2E8F0 / #1F2937
    
    // Hover
    hover: 'hover:bg-slate-100 dark:hover:bg-slate-800',
  },
};

// ==================== BUTTON STYLES ====================

export const buttons = {
  // Primary - Indigo (Main actions)
  primary: `${colors.primary.bg} ${colors.primary.bgHover} dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white hover:text-white shadow-sm`,
  
  // Secondary - Teal (Secondary actions)
  secondary: `${colors.teal.bg} ${colors.teal.bgHover} ${colors.teal.bgDark} dark:hover:bg-teal-600 text-white hover:text-white shadow-sm`,
  
  // Accent - Amber (Highlight actions)
  accent: `${colors.amber.bg} ${colors.amber.bgHover} ${colors.amber.bgDark} dark:hover:bg-amber-700 text-white hover:text-white shadow-sm`,
  
  // Outline - Indigo (Subtle actions)
  outline: `border-2 ${colors.primary.border} ${colors.primary.text} hover:bg-indigo-600 hover:text-white dark:border-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white`,
  
  // Ghost - Minimal
  ghost: `${colors.neutral.subtext} ${colors.neutral.hover} hover:text-slate-900 dark:hover:text-white`,
  
  // Danger - Destructive actions
  danger: `${colors.danger.bg} ${colors.danger.bgHover} dark:bg-red-600 dark:hover:bg-red-700 text-white hover:text-white`,
  
  // Success - Success actions
  success: `${colors.success.bg} ${colors.success.bgHover} dark:bg-green-600 dark:hover:bg-green-700 text-white hover:text-white`,
};

// ==================== BADGE STYLES ====================

export const badges = {
  // Status badges
  published: `${colors.success.bg} text-white`,
  draft: `${colors.warning.bg} text-white`,
  pending: `bg-slate-500 text-white`,
  archived: `bg-slate-400 text-white`,
  
  // Feature badges
  verified: `${colors.info.bg} text-white`,
  featured: `${colors.amber.bg} text-white`,
  new: `${colors.teal.bg} text-white`,
  hot: `${colors.danger.bg} text-white`,
  
  // Outline variants
  outlinePrimary: `border-2 ${colors.primary.border} ${colors.primary.text} bg-white dark:bg-transparent`,
  outlineTeal: `border-2 ${colors.teal.border} ${colors.teal.text} bg-white dark:bg-transparent`,
  outlineGray: `border-2 ${colors.neutral.border} ${colors.neutral.subtext} bg-white dark:bg-transparent`,
  
  // Soft variants (subtle backgrounds)
  softPrimary: `${colors.primary.bgSoft} ${colors.primary.text} dark:bg-indigo-900/20 dark:text-indigo-400`,
  softTeal: `bg-teal-50 ${colors.teal.text} dark:bg-teal-900/20 dark:text-teal-400`,
  softAmber: `bg-amber-50 ${colors.amber.text} dark:bg-amber-900/20 dark:text-amber-400`,
  softSuccess: `${colors.success.bgSoft} ${colors.success.text} dark:bg-green-900/20 dark:text-green-400`,
};

// ==================== TEXT STYLES ====================

export const text = {
  // Hierarchy
  heading: colors.neutral.ink,
  body: colors.neutral.subtext,
  muted: colors.neutral.muted,
  
  // Branded
  primary: colors.primary.text + ' ' + colors.primary.textDark,
  teal: colors.teal.text + ' ' + colors.teal.textDark,
  amber: colors.amber.text + ' ' + colors.amber.textDark,
  
  // Semantic
  success: colors.success.text + ' ' + colors.success.textDark,
  warning: colors.warning.text + ' ' + colors.warning.textDark,
  danger: colors.danger.text + ' ' + colors.danger.textDark,
  info: colors.info.text + ' ' + colors.info.textDark,
  
  // Links
  link: `${colors.primary.text} ${colors.primary.textHover} ${colors.primary.textDark} hover:underline`,
};

// ==================== BACKGROUND STYLES ====================

export const backgrounds = {
  page: colors.neutral.bg,
  surface: colors.neutral.surface,
  surfaceAlt: colors.neutral.surfaceAlt,
  hover: colors.neutral.hover,
  
  // Soft branded backgrounds
  primarySoft: colors.primary.bgSoft + ' dark:bg-indigo-900/10',
  tealSoft: 'bg-teal-50 dark:bg-teal-900/10',
  amberSoft: 'bg-amber-50 dark:bg-amber-900/10',
  successSoft: colors.success.bgSoft + ' dark:bg-green-900/10',
  dangerSoft: colors.danger.bgSoft + ' dark:bg-red-900/10',
  infoSoft: colors.info.bgSoft + ' dark:bg-blue-900/10',
};

// ==================== BORDER STYLES ====================

export const borders = {
  default: colors.neutral.border,
  primary: colors.primary.border + ' ' + colors.primary.borderDark,
  teal: colors.teal.border,
  success: colors.success.border,
  danger: colors.danger.border,
  hover: 'hover:border-indigo-600 dark:hover:border-indigo-500',
};

// ==================== COMPONENT STYLES ====================

export const components = {
  // Cards
  card: `${backgrounds.surface} ${borders.default} rounded-lg shadow-sm`,
  cardHover: `${backgrounds.surface} ${borders.default} rounded-lg shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all`,
  
  // Inputs
  input: `${backgrounds.surface} ${borders.default} focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 dark:focus:border-indigo-500`,
  
  // Preview banner
  previewBanner: `${colors.info.bg} dark:bg-blue-700 text-white`,
  
  // Alerts
  alertInfo: `${backgrounds.infoSoft} border ${colors.info.border} ${colors.info.text}`,
  alertSuccess: `${backgrounds.successSoft} border ${colors.success.border} ${colors.success.text}`,
  alertWarning: `${backgrounds.amberSoft} border ${colors.warning.border} ${colors.warning.text}`,
  alertDanger: `${backgrounds.dangerSoft} border ${colors.danger.border} ${colors.danger.text}`,
};

// ==================== ICON STYLES ====================

export const icons = {
  primary: colors.primary.text,
  teal: colors.teal.text,
  amber: colors.amber.text,
  success: colors.success.text,
  warning: colors.warning.text,
  danger: colors.danger.text,
  muted: colors.neutral.muted,
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Combine multiple classes
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Get button variant
 */
export const getButtonClasses = (variant = 'primary') => {
  return buttons[variant] || buttons.primary;
};

/**
 * Get badge variant
 */
export const getBadgeClasses = (variant) => {
  return badges[variant] || badges.outlineGray;
};

// ==================== EXPORTS ====================

export default {
  colors,
  buttons,
  badges,
  text,
  backgrounds,
  borders,
  components,
  icons,
  cn,
  getButtonClasses,
  getBadgeClasses,
};
