import React from "react";

import Box from "../Box";
import Show from "../Show";
import PropTypes from "prop-types";
const BackgroundImage = ({
  urlImage,
  width = "100%",
  height = "100%",
  backgroundSize = "cover",
  backgroundPosition = "center",
  backgroundRepeat = "no-repeat",
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  children,
}) => {
  const _borderRadius = borderRadius
    ? borderRadius
    : `${borderTopLeftRadius || "0"} ${borderTopRightRadius || "0"} ${borderBottomRightRadius || "0"} ${borderBottomLeftRadius || "0"}`;
  return (
    <Box
      backgroundPosition={backgroundPosition}
      backgroundSize={backgroundSize}
      backgroundRepeat={backgroundRepeat}
      width={width}
      height={height}
      backgroundImage={`url(${urlImage})`}
      data-testid="background-box"
      borderRadius={_borderRadius}
    >
      <Show when={Boolean(children)}>{children}</Show>
    </Box>
  );
};

BackgroundImage.propTypes = {
  urlImage: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundSize: PropTypes.string,
  backgroundPosition: PropTypes.string,
  backgroundRepeat: PropTypes.string,
  loadingComponent: PropTypes.node,
  children: PropTypes.node,
  borderRadius: PropTypes.string,
  borderTopLeftRadius: PropTypes.string,
  borderTopRightRadius: PropTypes.string,
  borderBottomLeftRadius: PropTypes.string,
  borderBottomRightRadius: PropTypes.string,
};

export default BackgroundImage;
