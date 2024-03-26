export const argTypes = {
  gutter: {
    control: "select",
    options: [
      "size000",
      "size00",
      "size1",
      "size2",
      "size3",
      "size4",
      "size5",
      "size6",
      "size7",
      "size8",
      "size9",
      "size10",
      "size11",
      "size12",
      "size13",
      "size14",
      "size15",
    ],
  },
  gap: {
    control: "select",
    options: [
      "size000",
      "size00",
      "size1",
      "size2",
      "size3",
      "size4",
      "size5",
      "size6",
      "size7",
      "size8",
      "size9",
      "size10",
      "size11",
      "size12",
      "size13",
      "size14",
      "size15",
    ],
  },
  minItemWidth: {
    table: {
      type: { summary: "CSSLength" },
    },
    control: "text",
  },
  noStretchedColumns: {
    table: {
      type: { summary: "boolean" },
    },
    control: "boolean",
  },
  as: {
    table: {
      type: { summary: "string" },
    },
    control: "none",
  },
};
