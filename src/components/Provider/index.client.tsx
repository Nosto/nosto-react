import React, { useContext, useEffect, useMemo, useState } from "react";
import NostoContext from "./context.client";

interface NostoProviderProps {
  accountProp: string;
  currentVariationProp: string;
  countryProp: string;
  host: string;
  children: React.ReactElement;
  countryLoadCompleteProp: boolean;
}

const NostoProvider: React.FC<NostoProviderProps> = (props) => {

  const [ currentVariation, setCurrentVariation ] = useState(props.currentVariationProp);
  const currentVariationData = useMemo(() => ({ currentVariation, setCurrentVariation }), [currentVariation]);

  const [ country, setCountry ] = useState(props.countryProp);
  const countryData = useMemo(() => ({ country, setCountry }), [country]);

  const [ value, setValue ] = useState(props.countryLoadCompleteProp);
  const countryLoadComplete = useMemo(() => ({ value, setValue }), [value]);

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
    <NostoContext.Provider value={{ account: props.accountProp, currentVariationData, countryData, countryLoadComplete }}>
      {props.children}
    </NostoContext.Provider>
  );
};

export default NostoProvider;
