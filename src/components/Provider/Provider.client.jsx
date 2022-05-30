import React, { useEffect, createContext } from "react";

let NostoContext = createContext("");
NostoContext.displayName = "NostoContext";

function Provider({ account, host = null, children }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//" + (host || "connect.nosto.com") + "/include/" + account;
    script.async = true;
    document.head.appendChild(script);

    window.nostojs = (cb) =>
      (window.nostojs.q = window.nostojs.q || []).push(cb);
    window.nostojs((api) => api.setAutoLoad(false));
  }, []);

  return (
    <NostoContext.Provider value={{ account }}>
      {children}
    </NostoContext.Provider>
  );
}

export default Provider;
