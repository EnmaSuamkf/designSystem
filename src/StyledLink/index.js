/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { getProccecedProps, getThemeValue } from "../theme/util.js";

// eslint-disable-next-line react/prop-types
const DefaultLink = ({ to = "", onClick, ...props }) => (
  <a
    href={to}
    onClick={(e) => {
      if (onClick) {
        onClick(e);
      }
    }}
    {...props}
  />
);

const StyledLink = styled(DefaultLink).withConfig({
  shouldForwardProp: (prop) =>
    ![
      "onHoverColor",
      "onHoverTextDecoration",
      "color",
      "fontSize",
      "textDecoration",
      "cursor",
      "padding",
      "width",
    ].includes(prop),
})`
  ${({ onHoverColor, ...rest }) => {
    return getProccecedProps(rest);
  }};
  &:hover {
    color: ${(props) => getThemeValue(props.onHoverColor)};
    text-decoration: ${(props) => {
      return props.onHoverTextDecoration ? props.onHoverTextDecoration : "none";
    }};
  }
`;

export default StyledLink;
