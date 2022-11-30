import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";


import styled from 'styled-components'

export const StyledButton = styled.button`
  background: ${props => props.disabled ? 'red' : 'green'};
`;


export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledButton
      {...props}
      disabled={!IS_BROWSER || props.disabled}
    />
  );
}
