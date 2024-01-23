import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { Component } from "./Component";

const installCode = `
## You must install @bedrock-layout/css 
yarn add @bedrock-layout/css

## Optionally, you can install the package for your framework of choice(React.js, Solid.js).
## For React.js
yarn add @bedrock-layout/stack
  ## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// You must import the CSS

// You can import the entire CSS
import "@bedrock-layout/css/lib/bedrock-layout.min.css";

// or just the component's CSS
import "@bedrock-layout/css/lib/components/stack.min.css";

//Then you can import the component from the package

// For React.js
import { Stack } from '@bedrock-layout/stack'
  // or
import { Stack } from '@bedrock-layout/primitives'

// For Solid.js
import { Stack } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Spacer Components/Stack",
  component: Stack,
  args: {
    gutter: "size3",
  },
  render: (args) => {
    return (
      <Stack {...args}>
        <Component />
        <Component />
        <Component />
        <Component />
      </Stack>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
    },
    examples: [
      {
        name: "Product Card",
        path: "/?path=/docs/examples-basic--docs#product-card",
      },
      {
        name: "Basic Form",
        path: "/?path=/docs/examples-basic--docs#basic-form",
      },
      {
        name: "Pricing Plan",
        path: "/?path=/docs/examples-basic--docs#pricing-plan",
      },
      {
        name: "Header Sections",
        path: "/?path=/docs/examples-basic--docs#header-sections",
      },
      {
        name: "Aspect Ratio Image Card",
        path: "/?path=/docs/examples-web-dev--docs#ratio-image-card",
      },
    ],
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof Stack>;

export const Playground: Story = {};

/**
 * The `gutter` prop defines the gutter size between elements.
 * Ultimately, the space is controlled by setting the `--gutter` CSS variable.
 *
 * #### Default values
 * Bedrock has implemented a default spacing scheme,
 * but [it can be overridden using the ThemeProvider provided by `@bedrock-layout/spacing-constants`.](/docs/getting-started-lesson-3-spacing--docs#integrating-with-your-design-system)
 * You can also use any valid CSSLength or positive integer.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * // Using the predefined spacing constants
 * <div data-bedrock-stack='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-bedrock-stack style={{ "--gutter": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Stack gutter="size3">
 *  <Component />
 *  <Component />
 * </Stack>
 *
 * // Or you can use a css value directly
 * <Stack gutter="3ch">
 *  <Component />
 *  <Component />
 * </Stack>
 *
 * // or you can use a custom property
 * <Stack gutter="--custom-size-4">
 *  <Component />
 *  <Component />
 * </Stack>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <Stack gutter={20}>
          <Component />
          <Component />
        </Stack>
        <strong>Custom gutter as string ("3ch")</strong>
        <Stack gutter="3ch">
          <Component />
          <Component />
        </Stack>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <Stack gutter={gutter}>
              <Component />
              <Component />
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};
