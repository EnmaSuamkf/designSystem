import styled, { css } from "styled-components";
import { getThemeValue } from "../theme/util";
import { getFieldBaseStyles } from "../theme/fieldStyles";
import { mobileOnly } from "../theme/breakpoints";

// Base native select shared by SelectList and Select. Caller style props
// (border, padding, width...) come after the base look, so they keep overriding it.
export const StyledSelect = styled.select`
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
  ${mobileOnly`
    width: 100%;
    max-width: 100%;
    min-height: 44px;
    font-size: 16px;
    text-overflow: ellipsis;
    box-sizing: border-box;
  `}
`;
