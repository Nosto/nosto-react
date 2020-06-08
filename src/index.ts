declare global {
  interface Window {
    nostojs: any;
    nosto: any;
  }
}

window.nostojs = (cb: Function) => (window.nostojs.q = window.nostojs.q || []).push(cb);
// @ts-ignore
window.nostojs(api => api.setAutoLoad(false));

export { default as NostoProduct } from "./components/Product";
export { default as NostoCategory } from "./components/Category";
export { default as NostoSearch } from "./components/Search";
export { default as NostoOrder } from "./components/Order";
export { default as NostoHome } from "./components/Home";
export { default as NostoPlacement } from "./components/Placement";
export { default as NostoProvider } from "./components/Provider";
export { default as NostoSession } from "./components/Session";
