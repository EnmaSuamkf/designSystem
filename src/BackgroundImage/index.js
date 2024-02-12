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
  children,
}) => {
  return (
    <Box
      backgroundPosition={backgroundPosition}
      backgroundSize={backgroundSize}
      backgroundRepeat={backgroundRepeat}
      width={width}
      height={height}
      backgroundImage={`url(${urlImage})`}
      data-testid="background-box"
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
  children: PropTypes.node,
};

export default BackgroundImage;
