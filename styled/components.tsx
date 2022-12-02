import Home from "../routes/index.tsx";
import Greet from "../routes/[name].tsx";

export const components = <>
<Home/>
<Greet 
    url={new URL("localhost.com:8000")}
    route="test"
    params={{}} 
    data={"test"}/>  
</>
