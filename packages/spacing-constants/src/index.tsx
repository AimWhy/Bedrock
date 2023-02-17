import OpenProps from "open-props";
import React, { createContext, useContext } from "react";

type Maybe<T> = NonNullable<T> | undefined;

function convertToMaybe<T>(value: T): Maybe<T> {
  return value ?? undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-interface
export interface DefaultTheme {}

export const ThemeContext = createContext<DefaultTheme>({});

/* c8 ignore next */
export function useTheme(): DefaultTheme {
  return useContext(ThemeContext) ?? {};
}

/* c8 ignore next */
export function ThemeProvider({
  theme,
  children,
}: {
  theme: DefaultTheme;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

type LowercaseCharacter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

type AllCharacter = LowercaseCharacter | Uppercase<LowercaseCharacter>;

type NonEmptyString = `${AllCharacter}${string}`;

type CSSLengthUnit = `${number}${LengthUnit}`;

type CSSCustomProperties = `--${NonEmptyString}`;

type CSSCustomPropertiesWithVar = `var(${CSSCustomProperties})`;

type LengthUnit =
  | "vmin"
  | "vmax"
  | "vh"
  | "vw"
  | "%"
  | "ch"
  | "ex"
  | "em"
  | "rem"
  | "in"
  | "cm"
  | "mm"
  | "pt"
  | "pc"
  | "px";

type CSSSizeKeyword =
  | "auto"
  | "inherit"
  | "none"
  | "min-content"
  | "max-content"
  | "fit-content";

export type CSSLength =
  | CSSLengthUnit
  | CSSCustomPropertiesWithVar
  | CSSCustomProperties
  | CSSSizeKeyword;

function fromEntries<K extends string | number, T>(
  entries: [s: K, value: T][]
): Record<K, T> {
  return entries.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {} as Record<K, T>);
}

const {
  sizeXxs,
  sizeXs,
  sizeSm,
  sizeMd,
  sizeLg,
  sizeXl,
  sizeXxl,
  sizeContent1,
  sizeContent2,
  sizeContent3,
  sizeHeader1,
  sizeHeader2,
  sizeHeader3,
  size000,
  size00,
  size1,
  size2,
  size3,
  size4,
  size5,
  size6,
  size7,
  size8,
  size9,
  size10,
  size11,
  size12,
  size13,
  size14,
  size15,
} = OpenProps;

const space = {
  size000,
  size00,
  size1,
  size2,
  size3,
  size4,
  size5,
  size6,
  size7,
  size8,
  size9,
  size10,
  size11,
  size12,
  size13,
  size14,
  size15,
};

const size = {
  sizeXxs,
  sizeXs,
  sizeSm,
  sizeMd,
  sizeLg,
  sizeXl,
  sizeXxl,
  sizeContent1,
  sizeContent2,
  sizeContent3,
  sizeHeader1,
  sizeHeader2,
  sizeHeader3,
};

export const spacing = space as Record<keyof typeof space, CSSLength>;

export const sizes = size as Record<keyof typeof size, CSSLength>;

const customPropertyRegex = /^--\D{1}.{0,100}$/;

function checkIsCSSCustomProperty(str: string): str is CSSCustomProperties {
  return customPropertyRegex.test(str);
}

function checkIsCSSSizeKeyword(str: string): str is CSSSizeKeyword {
  return [
    "auto",
    "inherit",
    "none",
    "min-content",
    "max-content",
    "fit-content",
  ].includes(str);
}

export function checkIsCSSLength(str: unknown): str is CSSLength {
  if (typeof str !== "string") return false;

  return (
    [
      /^[0-9]{0,10000}\.?[0-9]{1,10000}(vmin|vmax|vh|vw|%|ch|ex|em|rem|in|cm|mm|pt|pc|px)$/,
      /^var\(--\D{1}.{0,100}\)$/,
      customPropertyRegex,
    ].some((regex) => regex.test(str)) || checkIsCSSSizeKeyword(str)
  );
}

export type BaseTheme = Record<string, CSSLength | string | number>;

type ThemeOrDefaultSpace<T> = T extends {
  space: BaseTheme;
}
  ? T["space"]
  : keyof typeof spacing;

type ThemeOrDefaultSizes<T> = T extends {
  sizes: BaseTheme;
}
  ? T["sizes"]
  : keyof typeof sizes;

export type SpacingOptions = ThemeOrDefaultSpace<DefaultTheme>;
export type SizesOptions = ThemeOrDefaultSizes<DefaultTheme>;

export function getSpacingValue<T extends DefaultTheme>(
  theme: T & {
    space?: BaseTheme;
  },
  spacingKey: SpacingOptions
): Maybe<CSSLength> {
  const maybeSpacingOrDefault = theme.space ?? spacing;

  const safeSpacings = fromEntries(
    Object.entries(maybeSpacingOrDefault).map(([spaceKey, value]) => [
      spaceKey as SpacingOptions,
      (typeof value === "number" ? `${value}px` : value) as CSSLength,
    ])
  );

  return convertToMaybe(safeSpacings[spacingKey]);
}

export type Gutter = CSSLength | number | SpacingOptions;

export function getSafeGutter<T extends DefaultTheme>(
  theme: T,
  gutter?: Gutter
): Maybe<CSSLength> {
  if (gutter === undefined) return undefined;
  if (typeof gutter === "number" && gutter >= 0) return `${gutter}px`;
  if (typeof gutter === "string" && checkIsCSSLength(gutter))
    return checkIsCSSCustomProperty(gutter) ? `var(${gutter})` : gutter;

  return convertToMaybe(getSpacingValue(theme, gutter as SpacingOptions));
}

export function getSizeValue(
  theme: {
    sizes?: BaseTheme;
  },
  sizeKey?: string | number
): Maybe<CSSLength> {
  if (sizeKey === undefined) return undefined;
  if (typeof sizeKey === "number" && sizeKey >= 0) return `${sizeKey}px`;
  if (typeof sizeKey === "string" && checkIsCSSLength(sizeKey))
    return checkIsCSSCustomProperty(sizeKey) ? `var(${sizeKey})` : sizeKey;

  const maybeSizesOrDefault = theme.sizes ?? sizes;

  const safeSizes = fromEntries(
    Object.entries(maybeSizesOrDefault).map(([sizeKey, value]) => [
      sizeKey as SizesOptions,
      (typeof value === "number" ? `${value}px` : value) as CSSLength,
    ])
  );

  return convertToMaybe(safeSizes[sizeKey as SizesOptions]);
}
