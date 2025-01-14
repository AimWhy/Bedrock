export const argTypes = {
  gutter: {
    description: "Sets space between each element",
    type: { name: "string", required: true },
    table: {
      type: { summary: "string" },
    },
    control: "select",
    options: [
      "none",
      "xxs",
      "xs",
      "sm",
      "md",
      "mdLg",
      "lg",
      "lgXl",
      "xl",
      "xlXXl",
      "xxl",
    ],
  },
  minHeight: {
    description: "Sets the minimum block size of the component",
    type: { name: "string" },
    table: {
      type: { summary: "CSSLength" },
      defaultValue: { summary: "100vh" },
    },
    control: "text",
  },
  top: {
    description: "renders an React Node before the children",
    type: { name: "ReactNode" },
    table: {
      type: { summary: "ReactNode" },
    },
  },
  bottom: {
    description: "renders an React Node after the children",
    type: { name: "ReactNode" },
    table: {
      type: { summary: "ReactNode" },
    },
  },
};
