import { useState } from 'react'
export function useClientScriptLoaded() {
    const [clientScriptLoadedState, setClientScriptLoadedState] = useState(false)
    return { clientScriptLoadedState, setClientScriptLoadedState }
}