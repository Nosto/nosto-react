import React, { useContext, useEffect, useState } from "react";
import {NostoContext} from "./context";

interface NostoProviderProps {
  accountProp: string;
  currentVariationProp: string;
  countryProp: string;
  host: string;
  children: React.ReactElement;
}

const NostoProvider = (props: NostoProviderProps) => {

  const [ account, setAccount ] = useState(props.accountProp);
  const [ currentVariation, setCurrentVariation ] = useState(props.currentVariationProp ? props.currentVariationProp : "EUR");
  const [ country, setCountry ] = useState(props.countryProp);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//" + (props.host || "connect.nosto.com") + "/include/" + props.accountProp;
    script.async = true;
    document.head.appendChild(script);

    window.nostojs = (cb: Function) =>
      (window.nostojs.q = window.nostojs.q || []).push(cb);
    // @ts-ignore
    window.nostojs((api) => api.setAutoLoad(false));
  }, []);

  return (
    <NostoContext.Provider value="Sample test">
      {props.children}
    </NostoContext.Provider>
  );
};

export default NostoProvider;
