import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  ensureContrast,
  getReadableTextColor,
  getThemeValue,
  shadeColor,
  tintColor,
} from "../theme/util";

const FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

const t = getThemeValue;

// Text color for a filled background: white when it reaches 4.5:1, otherwise
// the better of white / neutral_100 (keeps the button readable on any palette).
const textOn = (background) =>
  getReadableTextColor(
    background,
    t("$theme_neutral_color_0"),
    t("$theme_neutral_color_100"),
  );

const variantStyles = (variant) => {
  switch (variant) {
    case "primary": {
      const bg = t("$theme_primary_color_100");
      const hover = t("$theme_primary_color_90");
      return css`
        background-color: ${bg};
        border-color: ${bg};
        color: ${textOn(bg)};
        &:hover:not(:disabled) {
          background-color: ${hover};
          border-color: ${hover};
          color: ${textOn(hover)};
        }
      `;
    }
    case "positive": {
      const bg = t("$theme_positive_color");
      const hover = shadeColor(bg, 0.12);
      return css`
        background-color: ${bg};
        border-color: ${bg};
        color: ${textOn(bg)};
        &:hover:not(:disabled) {
          background-color: ${hover};
          border-color: ${hover};
          color: ${textOn(hover)};
        }
      `;
    }
    case "negative": {
      const bg = t("$theme_negative_color");
      const surface = t("$theme_neutral_color_0");
      return css`
        background-color: ${surface};
        border-color: ${bg};
        color: ${ensureContrast(bg, surface)};
        &:hover:not(:disabled) {
          background-color: ${bg};
          border-color: ${bg};
          color: ${textOn(bg)};
        }
      `;
    }
    case "neutral":
      return css`
        background-color: transparent;
        border-color: transparent;
        color: ${t("$theme_neutral_color_100")};
        &:hover:not(:disabled) {
          background-color: ${tintColor(t("$theme_neutral_color_100"), 0.08)};
        }
      `;
    case "secondary":
      return css`
        background-color: ${t("$theme_neutral_color_0")};
        border-color: ${t("$theme_neutral_color_50")};
        color: ${t("$theme_neutral_color_100")};
        &:hover:not(:disabled) {
          background-color: ${tintColor(t("$theme_neutral_color_100"), 0.04)};
          border-color: ${t("$theme_neutral_color_70")};
        }
      `;
    default:
      return "";
  }
};

const StyledButton = styled.button`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: ${getThemeValue("$theme_radius_regular")};
  font-family: ${FONT_STACK};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
  width: ${(props) => (props.cover === "true" ? "100%" : "auto")};
  ${(props) => variantStyles(props.theme)}

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${() => t("$theme_secondary_color_70")};
  }
  ${(props) =>
    props.customTheme &&
    props.customTheme.background &&
    props.customTheme.color &&
    props.customTheme.borderColor &&
    props.customTheme.backgroundHover &&
    props.customTheme.hoverColor &&
    props.customTheme.borderHoverColor &&
    props.customTheme.backgroundFocus &&
    props.customTheme.focusColor &&
    props.customTheme.borderFocusColor &&
    css`
      background-color: ${getThemeValue(
        props.customTheme.background || "$theme_neutral_color_0",
      )};
      color: ${getThemeValue(
        props.customTheme.color || "$theme_neutral_color_100",
      )};
      border: 2px solid
        ${getThemeValue(
          props.customTheme.borderColor || "$theme_negative_color",
        )};

      &:hover {
        background: ${getThemeValue(
          props.customTheme.backgroundHover || "$theme_negative_color",
        )};
        color: ${getThemeValue(
          props.customTheme.hoverColor || "$theme_neutral_color_0",
        )};
        border: 2px solid
          ${getThemeValue(
            props.customTheme.borderHoverColor || "$theme_negative_color",
          )};
      }
      &:focus {
        background: ${getThemeValue(
          props.customTheme.backgroundFocus || "$theme_negative_color",
        )};
        color: ${getThemeValue(
          props.customTheme.focusColor || "$theme_neutral_color_0",
        )};
        border: 2px solid
          ${getThemeValue(
            props.customTheme.borderFocusColor || "$theme_negative_color",
          )};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${tintColor(t("$theme_neutral_color_100"), 0.06)};
      border-color: ${t("$theme_neutral_color_50")};
      color: ${t("$theme_neutral_color_70")};
      opacity: 0.55;
      cursor: not-allowed;
      box-shadow: none;
    `}
`;

const Button = ({
  onClick = () => {},
  children = () => <></>,
  style = {},
  theme = "primary",
  disabled = false,
  cover = false,
  customTheme = null,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={style}
      disabled={disabled}
      theme={theme}
      customTheme={customTheme}
      cover={cover.toString()}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  style: PropTypes.shape(),
  theme: PropTypes.oneOf([
    "primary",
    "secondary",
    "positive",
    "negative",
    "neutral",
  ]),
  cover: PropTypes.bool,
  customTheme: PropTypes.shape(),
};

export default Button;
