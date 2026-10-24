import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { getMobileStyles, getThemeValue } from "../theme/util";
import { mobileOnly } from "../theme/breakpoints";

const StyledH5 = styled.h5`
  ${(props) =>
    props.color &&
    css`
      color: ${getThemeValue(props.color)};
    `}
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${getThemeValue(props.fontSize)};
    `}
  ${(props) =>
    props.fontFamily &&
    css`
      font-family: ${getThemeValue(props.fontFamily)};
    `}
  ${(props) =>
    props.fontWeight &&
    css`
      font-weight: ${getThemeValue(props.fontWeight)};
    `}
    ${(props) =>
    props.textalign &&
    css`
      text-align: ${props.textalign};
    `}
  ${(props) =>
    props.lineHeight &&
    css`
      line-height: ${getThemeValue(props.lineHeight)};
    `}
  padding: 0px;
  margin: 0px;
  ${(props) =>
    props.$mobile &&
    mobileOnly`
      ${getMobileStyles(props.$mobile)}
    `}
`;
const styles = {
  5: {
    color: "black",
    fontSize: "20px",
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  4: {
    color: "black",
    fontSize: "18px",
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  3: {
    color: "black",
    fontSize: "16px",
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  2: {
    color: "black",
    fontSize: "14px",
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  1: {
    color: "black",
    fontSize: "12px",
    fontFamily: "Arial",
    fontWeight: "bold",
  },
};
// "as" renders another tag (e.g. h1) and "mobile" holds overrides below the mobile breakpoint.
const Heading = ({
  type,
  color,
  sx,
  textalign = "center",
  as,
  mobile,
  children,
}) => {
  return (
    <StyledH5
      as={as}
      $mobile={mobile}
      {...styles[type]}
      color={color}
      textalign={textalign}
      {...sx}
    >
      {children}
    </StyledH5>
  );
};
Heading.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  sx: PropTypes.object,
  textalign: PropTypes.string,
  as: PropTypes.elementType,
  mobile: PropTypes.object,
  children: PropTypes.node,
};
export default Heading;
