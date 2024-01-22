import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { getThemeValue } from "../theme/util";

const StyledButton = styled.button`
  border: none;
  color: ${getThemeValue("$theme_neutral_color_100")};
  padding: ${`${getThemeValue("$theme_spacing_1x_small")} ${getThemeValue(
    "$theme_spacing_small",
  )}`};
  cursor: pointer;
  border-radius: ${getThemeValue("$theme_radius_regular")};
  width: ${(props) => (props.cover === "true" ? "100%" : "auto")};
  ${(props) =>
    props.theme === "neutral" &&
    css`
      background-color: ${getThemeValue("$theme_neutral_color_70")};
      border: 2px solid ${getThemeValue("$theme_neutral_color_100")};

      &:hover {
        background: ${getThemeValue("$theme_neutral_color_70")};
        color: ${getThemeValue("$theme_neutral_color_100")};
      }
    `}
  ${(props) =>
    props.theme === "primary" &&
    css`
      background-color: ${getThemeValue("$theme_primary_color_30")};
      border: 2px solid ${getThemeValue("$theme_primary_color_100")};

      &:hover {
        background: ${getThemeValue("$theme_primary_color_100")};
        color: ${getThemeValue("$theme_neutral_color_0")};
      }
    `}
  ${(props) =>
    props.theme === "secondary" &&
    css`
      background-color: ${getThemeValue("$theme_neutral_color_0")};
      border: 2px solid ${getThemeValue("$theme_secondary_color_100")};

      &:hover {
        background: ${getThemeValue("$theme_secondary_color_100")};
        color: ${getThemeValue("$theme_neutral_color_0")};
      }
    `}
  ${(props) =>
    props.theme === "positive" &&
    css`
      background-color: ${getThemeValue("$theme_neutral_color_0")};
      border: 2px solid ${getThemeValue("$theme_positive_color")};

      &:hover {
        background: ${getThemeValue("$theme_positive_color")};
        color: ${getThemeValue("$theme_neutral_color_0")};
      }
    `}
  ${(props) =>
    props.theme === "negative" &&
    css`
      background-color: ${getThemeValue("$theme_neutral_color_0")};
      border: 2px solid ${getThemeValue("$theme_negative_color")};

      &:hover {
        background: ${getThemeValue("$theme_negative_color")};
        color: ${getThemeValue("$theme_neutral_color_0")};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${getThemeValue("$theme_neutral_color_0")};
      border: 2px solid ${getThemeValue("$theme_neutral_color_50")};
      color: ${getThemeValue("$theme_neutral_color_50")};
      cursor: unset;

      &:hover {
        background: ${getThemeValue("$theme_neutral_color_0")};
        color: ${getThemeValue("$theme_neutral_color_50")};
      }
    `}
`;

const Button = ({
  onClick = () => {},
  children = () => <></>,
  style = {},
  theme = "primary",
  disabled = false,
  cover = false,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={style}
      disabled={disabled}
      theme={theme}
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
};

export default Button;
