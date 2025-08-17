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
            scale: 2,
            x: clickPosition.x - windowSize.width / 2,
            y: clickPosition.y - windowSize.height / 2,
        }
    }

    const pageTransition = {
        type: 'tween',
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.5
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
                {isTransitioning && (
                    <>
                        {/* 收縮動畫層 */}
                        {animationPhase === 'shrinking' && (
                            <motion.div
                                className="fixed inset-0 z-[9999] pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at ${clickPosition.x}px ${clickPosition.y}px, transparent 0%, rgba(0,0,0,0.8) 50%)`
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}

                        {/* 白色過渡層 */}
                        {(animationPhase === 'white' || animationPhase === 'expanding') && (
                            <motion.div
                                className="fixed inset-0 z-[9998] bg-white pointer-events-none"
                                initial={{
                                    clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`
                                }}
                                animate={{
                                    clipPath: animationPhase === 'white'
                                        ? `circle(${Math.max(windowSize.width, windowSize.height)}px at ${clickPosition.x}px ${clickPosition.y}px)`
                                        : `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`
                                }}
                                transition={{
                                    duration: animationPhase === 'white' ? 0.15 : 0.5,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                            />
                        )}
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default PageTransition
