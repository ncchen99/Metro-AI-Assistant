import { useNavigate } from 'react-router-dom'
import { useAnimation } from '../contexts/AnimationContext'

const useAnimatedNavigate = () => {
    const navigate = useNavigate()
    const { startTransition } = useAnimation()

    const animatedNavigate = (path, event) => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()

            startTransition(event, () => {
                navigate(path)
            })
        } else {
            navigate(path)
        }
    }

    return animatedNavigate
}

export default useAnimatedNavigate
