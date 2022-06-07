import React, { useContext, useEffect, useState } from "react";
import {NostoContext} from "./context";

interface NostoProviderProps {
  accountProp: string;
  currentVariationProp: string;
  countryProp: string;
  host: string;
  children: React.ReactElement;
}

const NostoProvider: React.FC<NostoProviderProps> = ({
  accountProp,
  currentVariationProp,
  countryProp,
  host,
  children,
}) => {

  const [ account, setAccount ] = useState(accountProp);
  const [ currentVariation, setCurrentVariation ] = useState(currentVariationProp ? currentVariationProp : "EUR");
  const [ country, setCountry ] = useState(countryProp);
  const providerValue = { account, setAccount, currentVariation, setCurrentVariation, country, setCountry };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//" + (host || "connect.nosto.com") + "/include/" + accountProp;
    script.async = true;
    document.head.appendChild(script);

    window.nostojs = (cb: Function) =>
      (window.nostojs.q = window.nostojs.q || []).push(cb);
    // @ts-ignore
    window.nostojs((api) => api.setAutoLoad(false));
  }, []);

  return (
    <NostoContext.Provider value={providerValue}>
      {children}
    </NostoContext.Provider>
  );
};

export const useNostoContext = () => useContext(NostoContext);

export default NostoProvider;
