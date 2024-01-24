import React from "react";
import styled, { css } from "styled-components";
import { getThemeValue } from "../theme/util";

const StyledSelect = styled.select`
  ${(props) =>
    props.backgroundColor &&
    css`
      background-color: ${getThemeValue(props.backgroundColor)};
    `}
  ${(props) =>
    props.color &&
    css`
      color: ${getThemeValue(props.color)};
    `}
  ${(props) =>
    props.border &&
    css`
      border: ${getThemeValue(props.border)};
    `}
  ${(props) =>
    props.padding &&
    css`
      padding: ${getThemeValue(props.padding)};
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
`;

// eslint-disable-next-line react/prop-types
const SelectList = ({ list = [], callback }) => (
  <StyledSelect onChange={(e) => callback(e.target.value)}>
    {list.map((item, index) => (
      <option key={index} value={item}>
        {item}
      </option>
    ))}
  </StyledSelect>
);

export default SelectList;
