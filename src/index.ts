declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    nostojs: any;
    nosto: any;
  }
}

window.nostojs = (cb: Function) =>
  (window.nostojs.q = window.nostojs.q || []).push(cb);
// @ts-ignore
window.nostojs((api) => api.setAutoLoad(false));

export * from "./types"
// noinspection JSUnusedGlobalSymbols
export { default as Nosto404 } from "./components/Fohofo";
// noinspection JSUnusedGlobalSymbols
export { default as NostoOther } from "./components/Other";
// noinspection JSUnusedGlobalSymbols
export { default as NostoCheckout } from "./components/Checkout";
// noinspection JSUnusedGlobalSymbols
export { default as NostoProduct } from "./components/Product";
// noinspection JSUnusedGlobalSymbols
export { default as NostoCategory } from "./components/Category";
// noinspection JSUnusedGlobalSymbols
export { default as NostoSearch } from "./components/Search";
// noinspection JSUnusedGlobalSymbols
export { default as NostoOrder } from "./components/Order";
// noinspection JSUnusedGlobalSymbols
export { default as NostoHome } from "./components/Home";
// noinspection JSUnusedGlobalSymbols
export { default as NostoPlacement } from "./components/Placement";
// noinspection JSUnusedGlobalSymbols
export { default as NostoProvider } from "./components/Provider";
// noinspection JSUnusedGlobalSymbols
export { default as NostoSession } from "./components/Session";
