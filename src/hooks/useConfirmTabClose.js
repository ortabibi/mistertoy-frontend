import { useState, useEffect } from 'react'

export function useConfirmTabClose() {
    const [ hasChanges, setHasChanges ] = useState(false)

    useEffect(() => {
        if (!hasChanges) return 

        function handleBeforeUnload(ev) {
            ev.returnValue = true
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [hasChanges])

    return setHasChanges
}