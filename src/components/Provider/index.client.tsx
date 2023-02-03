import React, { useEffect, isValidElement, createElement } from "react";
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

  //Set responseMode for loading campaigns:
  const responseMode = isValidElement(recommendationComponent)
    ? "JSON_ORIGINAL"
    : "HTML";

  //RecommendationComponent for client-side rendering:
  function RecommendationComponentWrapper({
    nostoRecommendation,
  }: {
    nostoRecommendation?: object;
  }) {
    return React.cloneElement(recommendationComponent, { nostoRecommendation });
  }

  //Pass currentVariation as empty string if multiCurrency is disabled
  currentVariation = multiCurrency ? currentVariation : "";

  // CLIENT-SIDE RENDERING FOR RECS:
  const renderCampaigns = function (api: any, campaigns: any) {
    console.log("renderCampaigns!");

    //Inject content campaigns as usual
    api.placements.injectCampaigns(campaigns.content);

    //Render recommendation component into placements:
    for (const key in campaigns.recommendations) {
      let recommendation = campaigns.recommendations[key];
      let placementSelector = "#" + key;
      let placement = () => document.querySelector(placementSelector);
      // @ts-ignore
      placement()?.replaceWith(placement().cloneNode());

      //@ts-ignore
      createRoot(placement()).render(
        <RecommendationComponentWrapper
          nostoRecommendation={recommendation}
        ></RecommendationComponentWrapper>
      );
    }
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
    // @ts-ignore
    window.nostojs((api) => api.setAutoLoad(false));
  }, []);

  return (
    <NostoContext.Provider
      value={{
        account,
        clientScriptLoaded,
        currentVariation,
        responseMode,
        renderCampaigns,
        recommendationComponent,
      }}
    >
      {children}
    </NostoContext.Provider>
  );
};

export default NostoProvider;
