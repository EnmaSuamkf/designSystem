import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getThemeValue, getReadableTextColor } from "../theme/util.js";

const FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

const BACKGROUND_TOKENS = {
  positive: "$theme_positive_color",
  neutral: "$theme_neutral_color_30",
  primary: "$theme_secondary_color_50",
  warning: "$theme_negative_color",
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  width: 100%;
  padding: ${() => getThemeValue("$theme_spacing_small")}
    ${() => getThemeValue("$theme_spacing_base")};
  font-family: ${FONT_STACK};
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`;

const Message = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const Notication = ({ message, title, type = "positive" }) => {
  const background = getThemeValue(
    BACKGROUND_TOKENS[type] || BACKGROUND_TOKENS.positive,
  );
  // Pick white or dark text depending on the contrast with the palette color.
  const color = getReadableTextColor(
    background,
    getThemeValue("$theme_neutral_color_0"),
    getThemeValue("$theme_neutral_color_100"),
  );
  return (
    <Container $background={background} $color={color} role="status">
      <Title className="notification-title">{title}</Title>
      <Message>{message}</Message>
    </Container>
  );
};

Notication.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["positive", "neutral", "warning", "neutral"])
    .isRequired,
};
export default Notication;
