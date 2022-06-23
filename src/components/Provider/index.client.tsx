import React, { useEffect } from "react";
import { NostoContext } from "./context.client";

interface NostoProviderProps {
  account: string;
  currentVariation: string;
  host: string;
  children: React.ReactElement;
}

const NostoProvider: React.FC<NostoProviderProps> = ({
  account,
  currentVariation,
  host,
  children,
}) => {
  const [clientScriptLoaded, setClientScriptLoaded] = React.useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//" + (host || "connect.nosto.com") + "/include/" + account;
    script.async = true;
    script.onload = () => {
      console.log("Nosto client script loaded");
      setClientScriptLoaded(true);
    };
    document.head.appendChild(script);

    window.nostojs = (cb: Function) =>
      (window.nostojs.q = window.nostojs.q || []).push(cb);
    // @ts-ignore
    window.nostojs((api) => api.setAutoLoad(false));
  }, []);

  return (
    <NostoContext.Provider value={{ account, clientScriptLoaded }}>
      {children}
    </NostoContext.Provider>
  );
};

export default NostoProvider;
