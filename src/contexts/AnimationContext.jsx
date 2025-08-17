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
    const [animationPhase, setAnimationPhase] = useState('idle') // 'idle', 'shrinking', 'expanding'

    const startTransition = (event, callback) => {
        if (isTransitioning) return

        // 獲取點擊位置
        const clickX = event.clientX
        const clickY = event.clientY

        setClickPosition({ x: clickX, y: clickY })
        setIsTransitioning(true)
        setAnimationPhase('shrinking')

        // 第一階段：白色遮罩覆蓋畫面 (300ms)
        setTimeout(() => {
            if (callback) callback()

            // 延遲一點時間確保新頁面開始載入 (200ms)
            setTimeout(() => {
                setAnimationPhase('expanding')

                // 第二階段：白色遮罩淡出，新頁面淡入 (400ms)
                setTimeout(() => {
                    setAnimationPhase('idle')
                    setIsTransitioning(false)
                }, 400)
            }, 200)
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
