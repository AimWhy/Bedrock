import { Center } from "@bedrock-layout/center";
import {
  CSSLength,
  SizesOptions,
  getSizeValue,
  sizes,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React from "react";

/**
 * The `boundarySize` prop can accept any positive integer, `CSSLength`, `SizeOption`.
 */
export type BoundarySize = number | CSSLength | SizesOptions;

/**
 * Props for the AppBoundary component.
 */
export interface AppBoundaryProps {
  /**
   * Sets the size of the app boundary.
   * The `boundarySize` prop can accept any positive integer, `CSSLength`, `SizeOption`.
   */
  boundarySize?: BoundarySize;
}

/**
 * The `AppBoundary` component is designed to wrap your entire app.
 * Your app will be clamped at the `boundarySize` and stay centered on the screen.
 * By default, it will clamp the width at the `sizeXxl` option,
 * but can also be set to other the valid size options using the `boundarySize` prop.
 */
export const AppBoundary = forwardRefWithAs<"div", AppBoundaryProps>(
  function AppBoundary({ as, boundarySize, children, style, ...props }, ref) {
    const theme = useTheme();
    const maybeSize = getSizeValue(theme, boundarySize);
    const safeStyle = style ?? {};
    const Component = as ?? "div";
    return (
      <Component
        data-bedrock-appboundary
        ref={ref}
        {...props}
        style={{
          padding: 0,
          maxInlineSize: "100%",
          height: "100%",
          ...safeStyle,
        }}
      >
        <Center maxWidth={maybeSize ?? sizes.sizeXxl}>{children}</Center>
      </Component>
    );
  },
);
