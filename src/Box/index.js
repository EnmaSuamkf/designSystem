/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { getProccecedProps } from "../theme/util.js";

const BoxComponent = React.forwardRef((props, ref) => {
  const {
    "data-testid": dataTestId,
    children,
    key,
    className,
    onClick,
    id,
    sx,
  } = props;

  return (
    <div
      data-testid={dataTestId}
      key={key}
      className={className}
      onClick={onClick}
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
  ${(props) => {
    const styles = getProccecedProps(props);
    return styles;
  }}
`;

export default Box;
