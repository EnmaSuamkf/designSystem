/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { getProccecedProps } from "../theme/util.js";

export const StyledLi = styled(
  ({
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
    display,
    ...otherProps
  }) => <li {...otherProps} />,
)`
  ${(props) => {
    const {
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
      display,
    } = props;
    const styles = getProccecedProps({
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
      display,
    });
    return styles;
  }}
`;
export const StyledUl = styled(
  ({
    width,
    heigth,
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
  }) => <ul {...otherProps} />,
)`
  ${(props) => {
    const {
      width,
      heigth,
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
      heigth,
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
