/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProccecedProps } from "../theme/util.js";
import Box from "../Box/index.js";

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
    onChange,
    validation,
    value,
    validationMessage,
    ...otherProps
  }) => {
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
      <Box width={width}>
        <textarea onChange={onChange} value={value} {...otherProps} />
        {error ? (
          <Box
            color="red"
            fontSize="12px"
            marginTop="4px"
            marginLeft="4px"
            fontWeight="400"
            width={width}
          >
            {validationMessage}
          </Box>
        ) : null}
      </Box>
    );
  },
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
