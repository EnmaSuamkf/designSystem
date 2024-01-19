/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { getProccecedProps } from "../theme/util.js";

// Add this comment to add a suffix to the class name
/* sc-component-id: FlexBox */
const FlexBox = styled((props) => {
  const {
    "data-testid": dataTestId,
    children,
    key,
    className,
    onClick,
    ref,
  } = props;
  return (
    <div
      data-testid={dataTestId}
      children={children}
      key={key}
      className={className}
      onClick={onClick}
      ref={ref}
    />
  );
})`
  display: flex;
  flex-direction: row;
  ${(props) => {
    const styles = getProccecedProps(props);
    return styles;
  }}
`;

export default FlexBox;
