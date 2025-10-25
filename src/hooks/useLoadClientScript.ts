import { useState, useEffect } from "react"
import type { NostoProviderProps } from "../components/NostoProvider"
import scriptLoaderFn from "./scriptLoader"
import { init, initNostoStub, isNostoLoaded, nostojs } from "@nosto/nosto-js"

type NostoScriptProps = Pick<NostoProviderProps, "account" | "host" | "shopifyMarkets" | "loadScript" | "scriptLoader">

const defaultAttributes = { "nosto-client-script": "" }

/**
 * Hook for loading the Nosto client script and managing its load state.
 * 
 * @example
 * ```tsx
 * import { useLoadClientScript } from '@nosto/nosto-react'
 * 
 * function MyNostoProvider() {
 *   const { clientScriptLoaded } = useLoadClientScript({
 *     account: 'shopify-123456',
 *     loadScript: true,
 *     shopifyMarkets: {
 *       marketId: 'US',
 *       language: 'en'
 *     }
 *   })
 * 
 *   return (
 *     <div>
 *       {clientScriptLoaded ? (
 *         <p>Nosto script loaded successfully</p>
 *       ) : (
 *         <p>Loading Nosto script...</p>
 *       )}
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example Custom script loader
 * ```tsx
 * import { useLoadClientScript } from '@nosto/nosto-react'
 * 
 * function CustomNostoProvider() {
 *   const customScriptLoader = (url: string) => {
 *     const script = document.createElement('script')
 *     script.src = url
 *     script.async = true
 *     document.head.appendChild(script)
 *     return script
 *   }
 * 
 *   const { clientScriptLoaded } = useLoadClientScript({
 *     account: 'my-nosto-account',
 *     scriptLoader: customScriptLoader
 *   })
 * 
 *   return <div>Script loaded: {String(clientScriptLoaded)}</div>
 * }
 * ```
 * 
 * @group Essential Functions
 */
export function useLoadClientScript(props: NostoScriptProps) {
  const {
    scriptLoader = scriptLoaderFn,
    account,
    shopifyMarkets,
    loadScript = true
  } = props
  const [clientScriptLoaded, setClientScriptLoaded] = useState(false)

  useEffect(() => {
    function scriptOnload() {
      setClientScriptLoaded(true)
    }

    initNostoStub()
    nostojs(api => api.setAutoLoad(false))

    if (!loadScript) {
      nostojs(scriptOnload)
      return
    }

    async function initClientScript() {
      await init({
        merchantId: account,
        shopifyInternational: shopifyMarkets,
        options: {
          attributes: defaultAttributes
        },
        scriptLoader
      })
      scriptOnload()
    }

    // Load Nosto client script if not already loaded externally
    if (!isNostoLoaded() || shopifyMarkets) {
      initClientScript()
    }
  }, [shopifyMarkets?.marketId, shopifyMarkets?.language])

  return { clientScriptLoaded }
}
