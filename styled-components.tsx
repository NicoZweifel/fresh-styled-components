
import  { ServerStyleSheet } from "styled-components";
import Home from './routes/index.tsx';
import { Plugin } from '$fresh/server.ts'
import { renderToString } from "preact-render-to-string";
import Greet from "./routes/[name].tsx";


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
      return {
          styles: styleTags
          .replaceAll("<style([\\s\\S]+?)</style", "")
          .split(">")
          .map(x => x
            .trim())
            .filter(x => x.length > 0)
            .map(x => {
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