/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { getProccecedProps } from "../theme/util.js";

const StyledInput = styled.input`
  ${(props) => {
    const {
      width,
      height,
      textalign,
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
      focusvisible,
      border,
    } = props;
    let styles = getProccecedProps({
      width,
      height,
      textalign,
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
      border,
    });
    if (focusvisible) {
      styles += `
        &:focus-visible {
          ${getProccecedProps(focusvisible)}
        }
      `;
    }
    return styles;
  }}
`;

const Input = React.forwardRef(({ onChange, onClick, ...otherProps }, ref) => {
  return (
    <StyledInput
      ref={ref}
      onChange={onChange}
      onClick={onClick}
      {...otherProps}
    />
  );
});

Input.displayName = "Input";

export default Input;
