
import  { ServerStyleSheet } from "styled-components";
import Home from './routes/index.tsx';
import { Plugin } from '$fresh/server.ts'
import { renderToString } from "preact-render-to-string";
import Greet from "./routes/[name].tsx";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";


export default function styledComponents(): Plugin {
 return {
    name: "styled-components",
    render: (ctx) => {
      ctx.render()
      const sheet = new ServerStyleSheet();
      try {
      renderToString(
       sheet.collectStyles(
       <>
        <Home/>
        <Greet 
            url={new URL("localhost.com:8000")}
            route="test"
            params={{}} 
            data={"test"}/>  
        </>)
      );
      const styleTags = sheet.getStyleTags();
      const doc = new DOMParser().parseFromString(styleTags, "text/html");
      if(doc == null) return {
        styles: []
      }
      const matches : string [] = [...doc.querySelectorAll('style')]
        .map(style => style.textContent)
        .filter(x => x != null && x.length > 0)
        .map( x=> x as string);
      return {
        styles: matches.map(x => {
          return {
            cssText: x,
            id: '___STYLED'
          }
        })
      }
      } catch (error) {
        console.error(error);
      } finally {
        sheet.seal();
      }
      return {
        styles: []
      }
    }
 }
}