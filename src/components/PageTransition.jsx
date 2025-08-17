import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimation } from '../contexts/AnimationContext'

const PageTransition = ({ children, className = "" }) => {
    const { isTransitioning, clickPosition, animationPhase } = useAnimation()

    const getWindowSize = () => {
        if (typeof window !== 'undefined') {
            return { width: window.innerWidth, height: window.innerHeight }
        }
        return { width: 1920, height: 1080 }
    }

    const windowSize = getWindowSize()

    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 0.98,
        },
        in: {
            opacity: 1,
            scale: 1,
        },
        out: {
            opacity: 0,
            scale: 1,
        }
    }

    const pageTransition = {
        type: 'tween',
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.4
    }

    return (
        <>
            {/* 內容 */}
            <motion.div
                className={className}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                {children}
            </motion.div>

            {/* 動畫遮罩層 */}
            <AnimatePresence>
                {isTransitioning && (animationPhase === 'shrinking' || animationPhase === 'expanding') && (
                    <motion.div
                        className="fixed inset-0 z-[9999] pointer-events-none bg-white"
                        initial={{
                            clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
                            opacity: 0
                        }}
                        animate={{
                            clipPath: `circle(${Math.max(windowSize.width, windowSize.height) * 1.2}px at ${clickPosition.x}px ${clickPosition.y}px)`,
                            opacity: animationPhase === 'shrinking' ? 1 : 0
                        }}
                        exit={{
                            opacity: 0,
                            clipPath: `circle(${Math.max(windowSize.width, windowSize.height) * 1.2}px at ${clickPosition.x}px ${clickPosition.y}px)`
                        }}
                        transition={{
                            duration: animationPhase === 'shrinking' ? 0.3 : 0.4,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default PageTransition
