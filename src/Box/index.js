/* eslint-disable react/prop-types */
import React from "react";
import styled, { css } from "styled-components";
import { getProccecedProps, getThemeValue } from "../theme/util.js";

const BoxComponent = React.forwardRef((props, ref) => {
  const {
    "data-testid": dataTestId,
    children,
    key,
    className,
    onClick,
    onDoubleClick,
    onMouseEnter,
    onMouseLeave,
    id,
    sx,
  } = props;

  return (
    <div
      data-testid={dataTestId}
      key={key}
      className={className}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      id={id}
      style={sx}
      ref={ref}
    >
      {children}
    </div>
  );
});

BoxComponent.displayName = "BoxComponent";

const Box = styled(BoxComponent)`
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
  ${(props) => {
    const styles = getProccecedProps(props);
    return styles;
  }}
  ${(props) =>
    props.onHoverStyle &&
    css`
      &:hover {
        ${getProccecedProps(props.onHoverStyle)}
      }
    `}
`;

export default Box;
