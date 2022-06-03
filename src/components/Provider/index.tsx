import React, { useEffect, useState } from "react";
import NostoContext from "./context";

interface NostoProviderProps {
  accountProp: string;
  currentVariationProp: string;
  hostProp: string;
  childrenProp: React.ReactElement;
}

const NostoProvider: React.FC<NostoProviderProps> = ({
  accountProp,
  currentVariationProp,
  hostProp,
  childrenProp,
}) => {

  const [ account, setAccount ] = useState(accountProp);
  const [ currentVariation, setCurrentVariation ] = useState(currentVariationProp);
  const providerValue = { account, setAccount, currentVariation, setCurrentVariation };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//" + (hostProp || "connect.nosto.com") + "/include/" + accountProp;
    script.async = true;
    document.head.appendChild(script);

    window.nostojs = (cb: Function) =>
      (window.nostojs.q = window.nostojs.q || []).push(cb);
    // @ts-ignore
    window.nostojs((api) => api.setAutoLoad(false));
  }, []);

  return (
    <NostoContext.Provider value={ providerValue }>
      {childrenProp}
    </NostoContext.Provider>
  );
};

export default NostoProvider;
