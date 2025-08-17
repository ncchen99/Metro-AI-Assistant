import { useEffect } from 'react'

const usePageTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = title
        }
    }, [title])
}

export default usePageTitle
