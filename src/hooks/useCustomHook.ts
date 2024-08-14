import { useEffect, useMemo, useState } from "react"
import { NostoProviderProps } from "../components/NostoProvider"
import { loadNostoClientScripts, loadShopifyMarketsScripts } from "../components/helpers"

export function useCustomHook(props: NostoProviderProps) {
	const [ clientScriptLoadedState, setClientScriptLoadedState ] = useState(false)
	const clientScriptLoaded = useMemo(() => clientScriptLoadedState, [clientScriptLoadedState])

	const {
		account,
		loadScript = true,
		host,
		shopifyMarkets
  } = props

useEffect(() => {
  if(!loadScript) {
    window.nosto?.reload({
      site: "localhost",
    })
    setClientScriptLoadedState(true)
  } else {
    loadNostoClientScripts({ host, account, shopifyMarkets, loadScript, setClientScriptLoadedState })
    loadShopifyMarketsScripts({ host, account, shopifyMarkets, loadScript, setClientScriptLoadedState, clientScriptLoadedState })
  }
  }, [clientScriptLoadedState, shopifyMarkets])

	return {
		clientScriptLoaded,
		clientScriptLoadedState,
		setClientScriptLoadedState, 
	}
}