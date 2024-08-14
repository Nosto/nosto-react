import { NostoClient } from "../types"
import { useClientScriptLoaded } from "../hooks/useClientScriptLoaded"
import { NostoProviderProps } from "../components/NostoProvider"
import { isNostoLoaded } from "../components/helpers"

type LoadNostoScriptProps = Pick<NostoProviderProps, "account" | "host" | "shopifyMarkets" | "loadScript">

function scriptLoad ({account, host, shopifyMarkets}: LoadNostoScriptProps)  {
  let urlPartial
  const { setClientScriptLoadedState } = useClientScriptLoaded()
  const script = document.createElement("script")
  if(!shopifyMarkets || !Object.keys(shopifyMarkets).length) {
    urlPartial = `/include/${account}`
  } else {
    urlPartial = `/script/shopify/market/nosto.js?merchant=${account}&market=${shopifyMarkets.marketId || "" }&locale=${shopifyMarkets?.language?.toLowerCase() || ""}`
    script.setAttribute("nosto-language", shopifyMarkets?.language || "")
    script.setAttribute("nosto-market-id", String(shopifyMarkets?.marketId))
  }
  script.type = "text/javascript"
  script.src = "//" + (host || "connect.nosto.com") + urlPartial
  script.async = true
  script.setAttribute("nosto-client-script", "")

  script.onload = () => {
    if (typeof jest !== "undefined") {
    window.nosto?.reload({
        site: "localhost",
    })
    }
    setClientScriptLoadedState(true)
  }
  document.body.appendChild(script)
}
  
export function loadNostoScripts({shopifyMarkets, loadScript, account, host}: LoadNostoScriptProps) {
	const { clientScriptLoadedState, setClientScriptLoadedState } = useClientScriptLoaded()

	if (!window.nostojs) {
			window.nostojs = (cb: (api: NostoClient) => void) => {
				(window.nostojs.q = window.nostojs.q || []).push(cb)
			}
			window.nostojs(api => api.setAutoLoad(false))
	}

	if(!loadScript) {
			window.nosto?.reload({
				site: "localhost",
			})
			setClientScriptLoadedState(true)
	} else {
		// Load Nosto client script
		if (!isNostoLoaded() && !shopifyMarkets) {
			scriptLoad({account, host})
		}
		if (shopifyMarkets) {
			// Load Shopify markets script if it is not loaded
			const existingScript = document.querySelector("[nosto-client-script]")
			const nostoSandbox = document.querySelector("#nosto-sandbox")

			if (
					!existingScript ||
					existingScript?.getAttribute("nosto-language") !== shopifyMarkets?.language ||
					existingScript?.getAttribute("nosto-market-id") !== shopifyMarkets?.marketId
			) {
					if (clientScriptLoadedState) {
							setClientScriptLoadedState(false)
					}

					existingScript?.parentNode?.removeChild(existingScript)
					nostoSandbox?.parentNode?.removeChild(nostoSandbox)
					
					scriptLoad({account, host, shopifyMarkets})
			}
		}
	}
}
