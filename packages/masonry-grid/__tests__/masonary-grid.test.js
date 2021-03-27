import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import MasonryGrid from "../src";

describe("MasonryGrid", () => {
  describe("correct usage", () => {
    test("MasonryGrid is not null", () => {
      expect(MasonryGrid).toBeTruthy();
    });

    it("renders default gutters", () => {
      const masonryGrid = create(
        <MasonryGrid>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>
      );
      expect(masonryGrid.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const masonryGrid = create(
          <MasonryGrid gutter={gutter}>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </MasonryGrid>
        );

        expect(masonryGrid.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom minItemWidth", () => {
      const masonryGrid = create(
        <MasonryGrid minItemWidth={320}>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>
      );
      expect(masonryGrid.toJSON()).toMatchSnapshot();
    });

    it("renders custom minItemWidth as string", () => {
      CSS.supports.mockImplementation(() => true);
      const masonryGrid = create(
        <MasonryGrid minItemWidth="32rem">
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>
      );
      expect(masonryGrid.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const masonryGrid = create(
        <ThemeProvider
          theme={{ breakPoints: { smallOnly: 320 }, spacing: { md: "200px" } }}
        >
          <MasonryGrid>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </MasonryGrid>
        </ThemeProvider>
      );
      expect(masonryGrid.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    beforeEach(() => {
      jest.spyOn(console, "error");
      console.error.mockImplementation(() => undefined);
    });
    afterEach(() => {
      console.error.mockRestore();
    });
    it("renders default with console error with wrong gutter input", () => {
      expect(console.error).not.toBeCalled();
      const errorStack = create(
        <MasonryGrid gutter="incorrect">
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>
      );
      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with minItemWidth input", () => {
      expect(console.error).not.toBeCalled();
      const errorStack = create(
        <MasonryGrid minItemWidth={{ value: "incorrect" }}>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>
      );
      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
