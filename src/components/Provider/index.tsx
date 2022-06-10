import React, { useContext, useEffect, useMemo, useState } from "react";
import NostoContext from "./context";

interface NostoProviderProps {
  accountProp: string;
  currentVariationProp: string;
  countryProp: string;
  host: string;
  children: React.ReactElement;
  ready: boolean;
}

const NostoProvider: React.FC<NostoProviderProps> = (props) => {
  
  const [ account, setAccount ] = useState(props.accountProp);
  const accountData = useMemo(() => ({ account, setAccount }), [account]);

  const [ currentVariation, setCurrentVariation ] = useState(props.currentVariationProp);
  const currentVariationData = useMemo(() => ({ currentVariation, setCurrentVariation }), [currentVariation]);

  const [ country, setCountry ] = useState(props.countryProp);
  const countryData = useMemo(() => ({ country, setCountry }), [country]);

  const [ ready, setReady ] = useState(props.ready);
  const readyFlag = useMemo(() => ({ ready, setReady }), [ready]);

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
    <NostoContext.Provider value={{ accountData, currentVariationData, countryData, readyFlag }}>
      {props.children}
    </NostoContext.Provider>
  );
};

export default NostoProvider;
