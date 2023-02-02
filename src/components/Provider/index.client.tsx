import React, { useEffect, isValidElement } from "react";
import { NostoContext } from "./context.client";

interface NostoProviderProps {
  account: string;
  currentVariation: string;
  host: string;
  children: React.ReactElement;
  multiCurrency: boolean;
  RecommendationComponent?: React.ReactComponentElement<any>;
}

const NostoProvider: React.FC<NostoProviderProps> = ({
  account,
  currentVariation = "",
  multiCurrency = false,
  host,
  children,
  RecommendationComponent,
}) => {
  const [clientScriptLoadedState, setClientScriptLoadedState] =
    React.useState(false);
  const clientScriptLoaded = React.useMemo(
    () => clientScriptLoadedState,
    [clientScriptLoadedState]
  );

  //Set responseMode for loading campaigns:
  const responseMode = isValidElement(RecommendationComponent)
    ? "JSON_ORIGINAL"
    : "HTML";

  //Pass currentVariation as empty string if multiCurrency is disabled
  currentVariation = multiCurrency ? currentVariation : "";

  useEffect(() => {
    if (!document.querySelectorAll("[nosto-client-script]").length) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//" + (host || "connect.nosto.com") + "/include/" + account;
      script.async = true;
      script.setAttribute("nosto-client-script", "");
      script.onload = () => {
        console.log("Nosto client script loaded");
        setClientScriptLoadedState(true);
      };
      document.head.appendChild(script);
    }

    window.nostojs = (cb: Function) =>
      (window.nostojs.q = window.nostojs.q || []).push(cb);
    // @ts-ignore
    window.nostojs((api) => api.setAutoLoad(false));
  }, []);

  return (
    <NostoContext.Provider
      value={{
        account,
        clientScriptLoaded,
        currentVariation,
        RecommendationComponent,
        responseMode,
      }}
    >
      {children}
    </NostoContext.Provider>
  );
};

export default NostoProvider;
