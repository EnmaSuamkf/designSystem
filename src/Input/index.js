/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProccecedProps } from "../theme/util.js";
import Box from "../Box/index.js";
import { use } from "react";
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
      validation,
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

const Input = React.forwardRef(
  (
    {
      onChange,
      onClick,
      onBlur,
      validation,
      value,
      validationMessage,
      ...otherProps
    },
    ref,
  ) => {
    const [error, setError] = useState(false);
    useEffect(() => {
      if (validation) {
        const isValid = validation(value);
        if (isValid) {
          setError(true);
        } else {
          setError(false);
        }
      }
    }, [value]);
    return (
      <Box>
        <StyledInput
          ref={ref}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          {...otherProps}
        />
        {error ? (
          <Box
            color="red"
            fontSize="12px"
            marginTop="4px"
            marginLeft="4px"
            fontWeight="400"
            width="100%"
          >
            {validationMessage}
          </Box>
        ) : null}
      </Box>
    );
  },
);

Input.displayName = "Input";

export default Input;
