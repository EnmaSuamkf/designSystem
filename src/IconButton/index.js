import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getThemeValue } from "../theme/util";
import { mobileOnly } from "../theme/breakpoints";

const StyledIconButton = styled.button`
  display: ${({ $mobileOnly }) => ($mobileOnly ? "none" : "inline-flex")};
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  margin: 0;
  padding: 0;
  background: transparent;
  border: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${() => getThemeValue("$theme_secondary_color_70")};
  }
  ${({ $mobileOnly }) =>
    $mobileOnly &&
    mobileOnly`
      display: inline-flex;
    `}
`;

// Square icon-only button. With mobileOnly it is only visible below the mobile
// breakpoint (e.g. the hamburger that opens the drawer). aria-* props are
// forwarded to the button.
const IconButton = ({
  children,
  size = "40px",
  mobileOnly: onlyMobile = false,
  type = "button",
  ...rest
}) => (
  <StyledIconButton type={type} $size={size} $mobileOnly={onlyMobile} {...rest}>
    {children}
  </StyledIconButton>
);
IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  mobileOnly: PropTypes.bool,
  type: PropTypes.string,
};
export default IconButton;
