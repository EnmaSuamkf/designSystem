import React from "react";
import PropTypes from "prop-types";

import { getThemeValue } from "../theme/util";
import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledLoadingBox = styled.div`
  height: ${(props) => (props.height ? props.height : "100%")};
  margin-bottom: 10px;
  width: ${(props) => (props.width ? props.width : "100%")};
  background: linear-gradient(
    90deg,
    ${(props) =>
        props.firstColor ||
        getThemeValue(props.firstColor || "$theme_neutral_color_0")}
      25%,
    ${(props) =>
        props.secondColor ||
        getThemeValue(props.secondColor || "$theme_neutral_color_50")}
      50%,
    ${(props) =>
        props.thirdColor ||
        getThemeValue(props.thirdColor || "$theme_neutral_color_70")}
      75%
  );
  background-size: 200% 100%;
  border-radius: ${(props) => getThemeValue(props.borderRadius)};
  animation: ${loadingAnimation} 2.5s infinite linear;
`;

const StyledLoadingLine = styled(StyledLoadingBox)`
  border-radius: 4px;
  height: 20px;
`;
const Loading = ({ children }) => <StyledLoading>{children}</StyledLoading>;

Loading.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react/prop-types
export const LoadingBox = ({ height, width, borderRadius = "8px" }) => {
  return (
    <StyledLoadingBox
      height={height}
      width={width}
      borderRadius={borderRadius}
      data-testid="loading-box"
    ></StyledLoadingBox>
  );
};
// eslint-disable-next-line react/prop-types
export const LoadingLine = ({ width }) => {
  return (
    <StyledLoadingLine
      width={width}
      data-testid="loading-line"
    ></StyledLoadingLine>
  );
};

export default Loading;
