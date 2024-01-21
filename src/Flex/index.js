/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import React from "react";
import styled, { css } from "styled-components";
import { getThemeValue, getProccecedProps } from "../theme/util";
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
  ${(props) =>
    props.ml &&
    css`
      margin-left: ${getThemeValue(props.ml)};
    `}
  ${(props) =>
    props.mr &&
    css`
      margin-right: ${getThemeValue(props.mr)};
    `}
  ${(props) =>
    props.mt &&
    css`
      margin-top: ${getThemeValue(props.mt)};
    `}
  ${(props) =>
    props.mb &&
    css`
      margin-bottom: ${getThemeValue(props.mb)};
    `}
  ${(props) =>
    props.my &&
    css`
      margin-top: ${getThemeValue(props.my)};
      margin-bottom: ${getThemeValue(props.my)};
    `}
    ${(props) =>
    props.mx &&
    css`
      margin-left: ${getThemeValue(props.mx)};
      margin-right: ${getThemeValue(props.mx)};
    `}
  ${(props) =>
    props.pl &&
    css`
      padding-left: ${getThemeValue(props.pl)};
    `}
  ${(props) =>
    props.pr &&
    css`
      padding-right: ${getThemeValue(props.pr)};
    `}
  ${(props) =>
    props.pt &&
    css`
      padding-top: ${getThemeValue(props.pt)};
    `}
  ${(props) =>
    props.pb &&
    css`
      padding-bottom: ${getThemeValue(props.pb)};
    `}
  ${(props) =>
    props.py &&
    css`
      padding-top: ${getThemeValue(props.py)};
      padding-bottom: ${getThemeValue(props.py)};
    `}
    ${(props) =>
    props.px &&
    css`
      padding-left: ${getThemeValue(props.px)};
      padding-right: ${getThemeValue(props.px)};
    `}
`;

export default FlexBox;
