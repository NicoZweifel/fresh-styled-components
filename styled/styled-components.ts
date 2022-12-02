
import  { ServerStyleSheet } from "styled-components";
import { Plugin } from '$fresh/server.ts'
import { renderToString } from "preact-render-to-string";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import { components } from "./components.tsx";
import { PluginRenderContext } from "https://deno.land/x/fresh@1.1.2/src/server/types.ts";
import { ID } from "./main.ts";

const main = `data:application/javascript,import hydrate from "${new URL("./main.ts", import.meta.url).href
    }";export default function(state) { hydrate(state); }`;

export default function styledComponents(): Plugin {
 return {
    name: "styled-components",
    entrypoints: { "main": main },
    render: (ctx: PluginRenderContext) => {
      const res = ctx.render()
      const sheet = new ServerStyleSheet();
      if (res.requiresHydration) {
        try {
          renderToString(sheet.collectStyles(components));
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
                id: ID
              }
          })
        }
        } catch (error) {
          console.error(error);
        } finally {
          sheet.seal();
        }
      }
      return {
        styles: []
      }
    }
 }
}
