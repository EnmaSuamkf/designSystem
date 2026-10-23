import { getThemeValue, tintColor } from "./util";

export const FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

/**
 * Shared base look for form fields (Input, SelectList, TextArea, SearchBar).
 * Returned as plain CSS so it can be placed BEFORE caller-provided style props,
 * which therefore keep overriding it.
 */
export const getFieldBaseStyles = ({ multiline = false } = {}) => `
  box-sizing: border-box;
  ${multiline ? "min-height: 40px;" : "height: 40px;"}
  padding: ${
    multiline
      ? `${getThemeValue("$theme_spacing_1x_small")} ${getThemeValue("$theme_spacing_small")}`
      : `0 ${getThemeValue("$theme_spacing_small")}`
  };
  border: 1px solid ${getThemeValue("$theme_neutral_color_50")};
  border-radius: ${getThemeValue("$theme_radius_regular")};
  background-color: ${getThemeValue("$theme_neutral_color_0")};
  color: ${getThemeValue("$theme_neutral_color_100")};
  font-family: ${FONT_STACK};
  font-size: 14px;
  line-height: 20px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: ${getThemeValue("$theme_neutral_color_70")};
    opacity: 1;
  }

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: ${getThemeValue("$theme_secondary_color_90")};
    box-shadow: 0 0 0 3px ${tintColor(
      getThemeValue("$theme_secondary_color_70"),
      0.35,
    )};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
