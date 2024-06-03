import { ThemeProvider, spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { describe, expect, it, test } from "vitest";

import { ColumnDrop } from "../src";

const Lorem = () => (
  <>
    {Array.from(Array(4).keys()).map((i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
        vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus
        neque sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum
        sollicitudin elit ac nunc scelerisque rhoncus. Nulla felis sapien,
        condimentum ut imperdiet vel, aliquet id ante. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Quisque ultrices, quam nec scelerisque malesuada, lectus elit semper
        diam, ac placerat purus tortor et enim.
      </p>
    ))}
  </>
);

describe("ColumnDrop", () => {
  describe("correct usage", () => {
    test("ColumnDrop is not null", () => {
      expect(ColumnDrop).toBeTruthy();
    });

    it("renders all the gutter options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gutter) => {
        const columnDrop = create(
          <ColumnDrop gutter={gutter}>
            <Lorem />
          </ColumnDrop>
        );
        expect(columnDrop.toJSON()).toMatchSnapshot();
      });
    });

    it("renders default gutter of 0px when no gutter supplied", () => {
      const errorStack = create(
        <ColumnDrop>
          <Lorem />
        </ColumnDrop>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders custom gutter with number", () => {
      const errorStack = create(
        <ColumnDrop gutter={320}>
          <Lorem />
        </ColumnDrop>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders custom gutter with number", () => {
      const errorStack = create(
        <ColumnDrop gutter="60ch">
          <Lorem />
        </ColumnDrop>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders custom minItemWidth", () => {
      const columnDrop = create(
        <ColumnDrop gutter="size3" minItemWidth={320}>
          <Lorem />
        </ColumnDrop>
      );
      expect(columnDrop.toJSON()).toMatchSnapshot();
    });

    it("renders with no stretch columns", () => {
      const columnDrop = create(
        <ColumnDrop gutter="size3" noStretchedColumns>
          <Lorem />
        </ColumnDrop>
      );
      expect(columnDrop.toJSON()).toMatchSnapshot();
    });

    it("renders custom minItemWidth as string", () => {
      const columnDrop = create(
        <ColumnDrop gutter="size3" minItemWidth="32rem">
          <Lorem />
        </ColumnDrop>
      );
      expect(columnDrop.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const grid = create(
        <ThemeProvider
          theme={{
            breakPoints: { smallOnly: 320 },
            spacing: { "1x": "200px" },
          }}
        >
          {/* @ts-expect-error */}
          <ColumnDrop gutter="1x">
            <Lorem />
          </ColumnDrop>
        </ThemeProvider>
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gutter input", () => {
      const errorStack = create(
        // @ts-expect-error
        <ColumnDrop gutter={{ value: "incorrect" }}>
          <Lorem />
        </ColumnDrop>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with minItemWidth input", () => {
      const errorStack = create(
        // @ts-expect-error
        <ColumnDrop gutter="size3" minItemWidth={{ value: "incorrect" }}>
          <Lorem />
        </ColumnDrop>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with incorrect noStretchColumns input", () => {
      const errorStack = create(
        // @ts-expect-error
        <ColumnDrop gutter="size3" noStretchedColumns={{ value: "incorrect" }}>
          <Lorem />
        </ColumnDrop>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with an invalid CSS String", () => {
      const errorStack = create(
        // @ts-expect-error
        <ColumnDrop gutter="size3" minItemWidth="garbage">
          <Lorem />
        </ColumnDrop>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
