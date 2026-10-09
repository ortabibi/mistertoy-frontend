import { useEffect, useRef } from 'react'

export function useEffectUpdate(callback, dependencies) {
    let isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        return callback()
    }, dependencies)
}