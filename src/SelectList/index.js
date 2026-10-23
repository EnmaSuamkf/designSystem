import React from "react";
import styled, { css } from "styled-components";
import { getThemeValue } from "../theme/util";
import { getFieldBaseStyles } from "../theme/fieldStyles";

const StyledSelect = styled.select`
  ${() => getFieldBaseStyles()}
  cursor: pointer;
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
  ${(props) => css`
    width: ${props.width || "100%"};
  `}
`;

// eslint-disable-next-line react/prop-types
const SelectList = ({ list = [], callback = () => {}, ...rest }) => {
  const handleChange = (e) => {
    const item = list.find((item) =>
      typeof item === "string" ? item : JSON.stringify(item) === e.target.value,
    );
    callback(item);
  };

  return (
    <StyledSelect onChange={handleChange} {...rest}>
      {list.map((item, index) => {
        const isString = typeof item === "string";
        return (
          <option key={index} value={isString ? item : JSON.stringify(item)}>
            {isString ? item : item.value}
          </option>
        );
      })}
    </StyledSelect>
  );
};

export default SelectList;
