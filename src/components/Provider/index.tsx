import React, { useEffect, useState } from "react";
import { NostoContext } from "./context";

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

  const [ contextValue, setContextValue ] = useState({ account, currentVariation });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://" + (host || "connect.nosto.com") + "/include/" + account;
    script.async = true;
    document.head.appendChild(script);

    window.nostojs = (cb: Function) =>
      (window.nostojs.q = window.nostojs.q || []).push(cb);
    // @ts-ignore
    window.nostojs((api) => api.setAutoLoad(false));
  }, []);

  return (
    <NostoContext.Provider value={ contextValue }>
      {children}
    </NostoContext.Provider>
  );
};

export default NostoProvider;
