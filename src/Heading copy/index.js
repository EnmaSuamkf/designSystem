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
    props.textalign &&
    css`
      text-align: ${props.textalign};
    `}
  padding: 0px;
  margin: 0px;
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
// eslint-disable-next-line react/prop-types
const Heading = ({ type, color, sx, textalign = "center", children }) => {
  return (
    <StyledH5 {...styles[type]} color={color} textalign={textalign} {...sx}>
      {children}
    </StyledH5>
  );
};
export default Heading;
