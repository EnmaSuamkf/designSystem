import { theme as defaultTheme } from "./theme";

const readSavedTheme = () => {
  let savedTheme;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (e) {
    return {};
  }
  if (!savedTheme) {
    return {};
  }
  try {
    const parsed = JSON.parse(savedTheme);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
};

/**
 * Resolves a theme token. Order: saved theme (localStorage.theme) ->
 * static defaults in theme.js -> the raw input (for non-token values such as
 * "100%", "none" or unknown tokens, which are returned untouched).
 */
export const getThemeValue = (token) => {
  const themeValues = readSavedTheme()[token];

  if (themeValues) {
    return themeValues;
  }
  if (
    typeof token === "string" &&
    Object.prototype.hasOwnProperty.call(defaultTheme, token) &&
    defaultTheme[token]
  ) {
    return defaultTheme[token];
  }
  return token;
};

const channelToLinear = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

const parseHex = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

export const getContrastRatio = (colorA, colorB) => {
  const a = parseHex(colorA);
  const b = parseHex(colorB);
  if (!a || !b) {
    return null;
  }
  const lum = ([r, g, bl]) =>
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(bl);
  const l1 = lum(a);
  const l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/**
 * Picks the text color for a filled background. `preferred` wins when it
 * reaches 4.5:1, otherwise the better of preferred/alternative is returned.
 * Non-hex colors fall back to `preferred`.
 */
export const getReadableTextColor = (background, preferred, alternative) => {
  const p = getContrastRatio(background, preferred);
  const a = getContrastRatio(background, alternative);
  if (p === null || a === null || p >= 4.5) {
    return preferred;
  }
  return a > p ? alternative : preferred;
};

/** Mixes a hex color with black (amount 0..1). Non-hex input is returned as is. */
export const shadeColor = (color, amount) => {
  const rgb = parseHex(color);
  if (!rgb) {
    return color;
  }
  const hex = rgb
    .map((v) =>
      Math.round(v * (1 - amount))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");
  return `#${hex}`;
};

/**
 * Darkens `color` step by step until it reaches `min` contrast on
 * `background` (used for colored text on light surfaces).
 */
export const ensureContrast = (color, background, min = 4.5) => {
  let current = color;
  for (let i = 1; i <= 20; i += 1) {
    const ratio = getContrastRatio(current, background);
    if (ratio === null || ratio >= min) {
      return current;
    }
    current = shadeColor(color, i * 0.05);
  }
  return current;
};

/** Composites `color` at `alpha` over `background`, returning a hex color. */
export const blendColor = (color, background, alpha) => {
  const fg = parseHex(color);
  const bg = parseHex(background);
  if (!fg || !bg) {
    return color;
  }
  const hex = fg
    .map((v, i) =>
      Math.round(v * alpha + bg[i] * (1 - alpha))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");
  return `#${hex}`;
};

/** Like colorWithOpacity but never throws: non-hex input is returned as is. */
export const tintColor = (color, opacity) => {
  const rgb = parseHex(color);
  return rgb ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})` : color;
};

const camelToKebab = (str) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

export const getProccecedProps = (props) => {
  const data = Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    const valuesArray = value && typeof value === "string" && value?.split(" ");
    const kebabKey = camelToKebab(key);
    let themeValue;
    if (valuesArray && valuesArray.length > 1) {
      themeValue = valuesArray.reduce((acc, _value) => {
        const currentThemeValue = getThemeValue(_value);
        return currentThemeValue ? `${acc} ${currentThemeValue}` : `${acc}`;
      }, "");
    } else {
      themeValue = getThemeValue(value);
    }
    return themeValue ? `${acc} ${kebabKey}: ${themeValue};` : `${acc}`;
  }, "");
  return data;
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const colorWithOpacity = (hex, opacity) => {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};
