import React from "react";
import PropTypes from "prop-types";

import { getThemeValue } from "../theme/util";
import Box from "../Box";
import FlexBox from "../Flex";
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

// Full-screen skeleton shown while an app boots. Desktop: side column + content
// (20% / 80%). Mobile has no side column, so it mimics the real screen: header
// bar, page title and stacked cards. The consumer tells which one to use.
export const LoadingPage = ({ isMobile = false }) => {
  if (isMobile) {
    return (
      <FlexBox
        data-testid="app-loading-mobile"
        flexDirection="column"
        width="100%"
        minHeight="100vh"
        padding="0px 16px 16px"
        boxSizing="border-box"
      >
        <LoadingBox height="56px" borderRadius="0px" />
        <Box width="55%">
          <LoadingBox height="28px" />
        </Box>
        <FlexBox flexDirection="column" gap="12px">
          <LoadingBox height="120px" />
          <LoadingBox height="120px" />
          <LoadingBox height="120px" />
        </FlexBox>
      </FlexBox>
    );
  }
  return (
    <FlexBox data-testid="app-loading-desktop" width="100%" height="100vh">
      <Box width="20%">
        <LoadingBox />
      </Box>
      <Box width="80%">
        <LoadingBox />
      </Box>
    </FlexBox>
  );
};
LoadingPage.propTypes = {
  isMobile: PropTypes.bool,
};

export default Loading;
