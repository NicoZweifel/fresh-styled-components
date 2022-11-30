import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import styled from "styled-components";

const StyledDiv = styled.div`
 background: green
`

export default function Greet(props: PageProps) {
  return <>
    <Head>
      <title>Fresh App</title>
    </Head>
    <StyledDiv>
      Hello {props.params.name}
    </StyledDiv>
  </>;
}
