import React, { createContext, useContext, useState } from 'react'

const AnimationContext = createContext()

export const useAnimation = () => {
    const context = useContext(AnimationContext)
    if (!context) {
        throw new Error('useAnimation must be used within AnimationProvider')
    }
    return context
}

export const AnimationProvider = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
    const [animationPhase, setAnimationPhase] = useState('idle') // 'idle', 'shrinking', 'white', 'expanding'

    const startTransition = (event, callback) => {
        if (isTransitioning) return

        // 獲取點擊位置
        const clickX = event.clientX
        const clickY = event.clientY

        setClickPosition({ x: clickX, y: clickY })
        setIsTransitioning(true)
        setAnimationPhase('shrinking')

        // 第一階段：收縮到點擊位置 (300ms)
        setTimeout(() => {
            setAnimationPhase('white')

            // 第二階段：白色過渡 (150ms)
            setTimeout(() => {
                if (callback) callback()
                setAnimationPhase('expanding')

                // 第三階段：白色背景收縮，新頁面淡入 (500ms)
                setTimeout(() => {
                    setAnimationPhase('idle')
                    setIsTransitioning(false)
                }, 500)
            }, 150)
        }, 300)
    }

    const value = {
        isTransitioning,
        clickPosition,
        animationPhase,
        startTransition
    }

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    )
}
