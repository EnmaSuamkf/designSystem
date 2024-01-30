import React from "react";
import styled, { css } from "styled-components";
import { getThemeValue } from "../theme/util";

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
    props.textAlign &&
    css`
      text-align: ${getThemeValue(props.textAlign)};
    `}
`;
const styles = {
  5: {
    color: "black",
    fontSize: "20px",
    fontFamily: "Arial",
    fontWeight: "bold",
    textAlign: "center",
  },
  4: {
    color: "black",
    fontSize: "18px",
    fontFamily: "Arial",
    fontWeight: "bold",
    textAlign: "center",
  },
  3: {
    color: "black",
    fontSize: "16px",
    fontFamily: "Arial",
    fontWeight: "bold",
    textAlign: "center",
  },
  2: {
    color: "black",
    fontSize: "14px",
    fontFamily: "Arial",
    fontWeight: "bold",
    textAlign: "center",
  },
  1: {
    color: "black",
    fontSize: "12px",
    fontFamily: "Arial",
    fontWeight: "bold",
    textAlign: "center",
  },
};
// eslint-disable-next-line react/prop-types
const Heading = ({ type, color, sx, children }) => {
  return (
    <StyledH5 {...styles[type]} color={color} {...sx}>
      {children}
    </StyledH5>
  );
};
export default Heading;
