import { Variants } from 'motion/react'

export const EASING = {
  default: [0, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const

export const DURATION = {
  fast: 0.3,
  default: 0.5,
  slow: 0.6,
} as const

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: DURATION.slow, ease: EASING.default }
  }
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: DURATION.default }
  }
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -32 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: DURATION.slow, ease: EASING.default }
  }
}
