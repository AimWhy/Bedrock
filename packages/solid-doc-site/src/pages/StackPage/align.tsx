/* eslint-disable react/style-prop-object */
import { Stack } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Align(): JSXElement {
  return (
    <>
      <h3>start</h3>
      <Stack align="start" gutter="size7">
        <Box style="height:200px" widthLevel={5} />
        <Box widthLevel={0.5} />
        <Box />
      </Stack>
      <h3>end</h3>
      <Stack align="end" gutter="size7">
        <Box style="height:200px" widthLevel={5} />
        <Box widthLevel={0.5} />
        <Box />
      </Stack>
      <h3>center</h3>
      <Stack align="center" gutter="size7">
        <Box style="height:200px" widthLevel={5} />
        <Box widthLevel={0.5} />
        <Box />
      </Stack>
      <h3>stretch</h3>
      <Stack align="stretch" gutter="size7">
        <Box style="height:200px" widthLevel={5} />
        <Box widthLevel={0.5} />
        <Box />
      </Stack>
    </>
  );
}
