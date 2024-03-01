/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { getProccecedProps } from "../theme/util.js";

const TextArea = styled(
  ({
    width,
    height,
    textalign,
    verticalAlign,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    padding,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    backgroundColor,
    ...otherProps
  }) => <textarea {...otherProps} />,
)`
  ${(props) => {
    const {
      width,
      height,
      textalign,
      verticalAlign,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      padding,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      backgroundColor,
    } = props;
    const styles = getProccecedProps({
      width,
      height,
      textalign,
      verticalAlign,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      padding,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      backgroundColor,
    });
    return styles;
  }}
`;

export default TextArea;
