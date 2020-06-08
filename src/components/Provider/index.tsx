import React, { useEffect } from "react";
import { NostoContext } from "./context";

interface NostoProviderProps {
  account: string;
  host: string;
  children: React.ReactElement
}

const Provider: React.FC<NostoProviderProps> = ({ account, host, children }) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//" + (host || "connect.nosto.com") + "/include/" + account;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <NostoContext.Provider value={{ account }}>
      {children}
    </NostoContext.Provider>
  );
};

export default Provider;
