// import { renderToString } from "preact-render-to-string";
// import  { ServerStyleSheet } from "styled-components";
// import { components } from "./components.tsx";

export const ID = '___STYLED';

export default function (_state: string[]) {
    console.log("Hydration state:", _state);
    // let el = document.getElementById(ID)
    // if (!el) {
    //     el = document.createElement('style')
    //     document.head.appendChild(el)
    // }
    // el.innerHTML = ''
    // const sheet = new ServerStyleSheet();
    // renderToString(sheet.collectStyles(components));
    // sheet.getStyleElement();
    // for (const entry of sheet.getStyleTags()) {
    //     console.log(entry)
    //     el.innerHTML += entry;
    // }
}
