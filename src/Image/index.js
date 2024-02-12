import React from "react";

import FlexBox from "../Flex";
import Box from "../Box";
import Show from "../Show";
import { LoadingBox } from "../Loading";
import PropTypes from "prop-types";
const Image = ({
  loadingBannerImage,
  urlImage,
  device,
  width,
  height,
  loadingLabel,
}) => {
  const defaultWidth = device === "desktop" ? "300px" : "150px";
  const defaultHeight = device === "desktop" ? "150px" : "150px";
  return (
    <>
      <Box
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        width={width || defaultWidth}
        height={height || defaultHeight}
        backgroundImage={loadingBannerImage ? "" : `url(${urlImage})`}
      >
        <Show when={!loadingBannerImage && !urlImage}>
          <FlexBox
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            border="1px solid"
            borderColor="$theme_neutral_color_50"
          >
            {loadingLabel && <h3>{loadingLabel}</h3>}
          </FlexBox>
        </Show>
        <Show when={loadingBannerImage}>
          <LoadingBox heigth="100%" />
        </Show>
      </Box>
    </>
  );
};

Image.propTypes = {
  loadingBannerImage: PropTypes.bool.isRequired,
  urlImage: PropTypes.string.isRequired,
  device: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  loadingLabel: PropTypes.string,
};

export default Image;
