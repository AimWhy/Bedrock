import { spacing } from "@bedrock-layout/spacing-constants";
import useContainerQuery from "@bedrock-layout/use-container-query";
import React from "react";
import { create } from "react-test-renderer";
import styled, { ThemeProvider } from "styled-components";

import { Split } from "../src";

vi.mock("@bedrock-layout/use-container-query");

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

describe("Split", () => {
  describe("correct usage", () => {
    test("Split is not null", () => {
      expect(Split).toBeTruthy();
    });

    it("renders default gutter when none provided", () => {
      const split = create(
        <Split>
          <Lorem />
        </Split>
      );
      expect(split.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const split = create(
          <Split gutter={gutter}>
            <Lorem />
          </Split>
        );
        expect(split.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom gutter with number", () => {
      const split = create(
        <Split gutter={1}>
          <Lorem />
        </Split>
      );
      expect(split.toJSON()).toMatchSnapshot();
    });

    it("renders custom gutter with string", () => {
      const split = create(
        <Split gutter="3ch">
          <Lorem />
        </Split>
      );
      expect(split.toJSON()).toMatchSnapshot();
    });

    it("renders all the fraction options", () => {
      ["auto-start", "auto-end", "1/4", "1/3", "1/2", "2/3", "3/4"].forEach(
        (fraction) => {
          const split = create(
            <Split gutter="lg" fraction={fraction}>
              <Lorem />
            </Split>
          );
          expect(split.toJSON()).toMatchSnapshot();
        }
      );
    });

    it("renders with theme overrides", () => {
      const split = create(
        <ThemeProvider theme={{ space: { "1x": "200px" } }}>
          <Split gutter="1x">
            <Lorem />
          </Split>
        </ThemeProvider>
      );
      expect(split.toJSON()).toMatchSnapshot();
    });

    it("should render a stack if container is below switchAt", () => {
      const widthToSwitchAt = 600;
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt + 1;
      });

      const stack = create(
        <Split gutter="lg" switchAt={widthToSwitchAt}>
          <Lorem />
        </Split>
      );

      expect(stack.toJSON()).toMatchSnapshot();

      useContainerQuery.mockRestore();
    });

    it("should render as a main", () => {
      const stack = create(
        <Split gutter="lg" as="main">
          <Lorem />
        </Split>
      );

      expect(stack.toJSON()).toMatchSnapshot();
    });

    it("should render as a main when wrapped in styled", () => {
      const WrappedSplit = styled(Split)``;
      const split = create(
        <WrappedSplit gutter="lg" as="main">
          <Lorem />
        </WrappedSplit>
      );

      expect(split.toJSON()).toMatchSnapshot();
    });

    it("should render a split if container is above switchAt", () => {
      const widthToSwitchAt = 600;
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt;
      });

      const stack = create(
        <Split gutter="lg" switchAt={widthToSwitchAt + 1}>
          <Lorem />
        </Split>
      );

      expect(stack.toJSON()).toMatchSnapshot();

      useContainerQuery.mockRestore();
    });

    it("should render a split if container is above switchAt using a css string", () => {
      const widthToSwitchAt = 600;
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt;
      });

      const stack = create(
        <Split gutter="lg" switchAt={`${(widthToSwitchAt + 1) / 16}rem`}>
          <Lorem />
        </Split>
      );

      expect(stack.toJSON()).toMatchSnapshot();

      useContainerQuery.mockRestore();
    });
  });

  describe("incorrect usage", () => {
    beforeEach(() => {
      vi.spyOn(console, "error");
      console.error.mockImplementation(() => undefined);
    });
    afterEach(() => {
      console.error.mockReset();
    });

    it("renders default with wrong gutter input", async () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Split gutter={{ value: "incorrect" }}>
          <Lorem />
        </Split>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with negative number for gutter", () => {
      const errorStack = create(
        <Split gutter={-1}>
          <Lorem />
        </Split>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with fraction input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Split fraction="incorrect">
          <Lorem />
        </Split>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with wrong switchAt input", () => {
      expect(console.error.mock.calls.length).toBe(0);

      const errorStack = create(
        <Split gutter="lg" switchAt={{ value: "incorrect" }}>
          <Lorem />
        </Split>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
