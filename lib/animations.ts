import { Variants } from 'framer-motion';

// Fade in from bottom
export const fadeInUp: Variants = {
    initial: {
        opacity: 0,
        y: 40
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }
    }
};

// Fade in from top
export const fadeInDown: Variants = {
    initial: {
        opacity: 0,
        y: -40
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }
    }
};

// Fade in from left
export const fadeInLeft: Variants = {
    initial: {
        opacity: 0,
        x: -40
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }
    }
};

// Fade in from right
export const fadeInRight: Variants = {
    initial: {
        opacity: 0,
        x: 40
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }
    }
};

// Scale fade in
export const scaleIn: Variants = {
    initial: {
        opacity: 0,
        scale: 0.9
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }
    }
};

// Stagger children
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
};

// Stagger with faster timing
export const staggerContainerFast: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        }
    }
};

// Draw line animation
export const drawLine: Variants = {
    initial: {
        pathLength: 0,
        opacity: 0
    },
    animate: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 1.5,
            ease: "easeInOut",
        }
    }
};

// Hover scale - as object for whileHover
export const hoverScale = {
    scale: 1.05,
    transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    }
};

// Hover lift (subtle elevation) - as object for whileHover
export const hoverLift = {
    y: -8,
    transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    }
};

// Reveal content (for text)
export const revealText: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }
    }
};

// Counter animation (for numbers)
export const counterAnimation: Variants = {
    initial: {
        opacity: 0,
        scale: 0.5
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }
    }
};

// Slide in with blur
export const slideInBlur: Variants = {
    initial: {
        opacity: 0,
        x: -100,
        filter: 'blur(10px)'
    },
    animate: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }
    }
};

// Parallax effect values (for useTransform)
export const parallaxConfig = {
    slow: { y: [0, -50] },
    fast: { y: [0, -100] }
};