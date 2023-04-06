import React, { useEffect, isValidElement, useState, useRef } from "react";
import { NostoContext } from "./context.client";
import { createRoot } from "react-dom/client";

interface NostoProviderProps {
  account: string;
  currentVariation: string;
  host: string;
  children: React.ReactElement;
  multiCurrency: boolean;
  recommendationComponent?: any;
}

const NostoProvider: React.FC<NostoProviderProps> = ({
  account,
  currentVariation = "",
  multiCurrency = false,
  host,
  children,
  recommendationComponent,
}) => {
  const [clientScriptLoadedState, setClientScriptLoadedState] =
    React.useState(false);
  const clientScriptLoaded = React.useMemo(
    () => clientScriptLoadedState,
    [clientScriptLoadedState]
  );

  //Pass currentVariation as empty string if multiCurrency is disabled
  currentVariation = multiCurrency ? currentVariation : "";

  // Set responseMode for loading campaigns:
  const responseMode = isValidElement(recommendationComponent)
    ? "JSON_ORIGINAL"
    : "HTML";

  // RecommendationComponent for client-side rendering:
  function RecommendationComponentWrapper(props: any) {
    return React.cloneElement(recommendationComponent, {
      nostoRecommendation: props.nostoRecommendation,
    });
  }

  // custom hook for rendering campaigns (CSR/SSR):
  const [pageType, setPageType] = useState("");
  const useRenderCampaigns: any = function (type: string = "") {
    const placementRefs: any = useRef({});
    useEffect(() => {
      if (pageType != type) {
        setPageType(type);
      }
    }, []);

    const pageTypeUpdated = type == pageType;

    function renderCampaigns(data: any, api: any) {
      if (responseMode == "HTML") {
        // inject content campaigns as usual:
        api.placements.injectCampaigns(data.recommendations);
      } else {
        // render recommendation component into placements:
        const recommendations = data.campaigns.recommendations;
        for (const key in recommendations) {
          let recommendation = recommendations[key];
          let placementSelector = "#" + key;
          let placement: Function = () =>
            document.querySelector(placementSelector);
          if (!!placement()) {
            if (!placementRefs.current[key])
              placementRefs.current[key] = createRoot(placement());
            const root = placementRefs.current[key];
            root.render(
              <RecommendationComponentWrapper
                nostoRecommendation={recommendation}
              ></RecommendationComponentWrapper>
            );
          }
        }
      }
    }
    return { renderCampaigns, pageTypeUpdated };
  };

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
    window.nostojs((api) => api.setAutoLoad(false));
  }, []);

  return (
    <NostoContext.Provider
      value={{
        account,
        clientScriptLoaded,
        currentVariation,
        responseMode,
        recommendationComponent,
        useRenderCampaigns,
        pageType,
      }}
    >
      {children}
    </NostoContext.Provider>
  );
};

export default NostoProvider;
