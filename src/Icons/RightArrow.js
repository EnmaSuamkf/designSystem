import React from "react";
import PropTypes from "prop-types";
import { getThemeValue } from "../theme/util";
import Box from "../Box";

const RightArrow = ({
  color = "$theme_neutral_color_100",
  width = "20px",
  height = "20px",
}) => {
  return (
    <Box width={width} height={height}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={getThemeValue(color)}
        width={width}
        height={height}
        version="1.1"
        id="Layer_1"
        viewBox="0 0 512 512"
        enableBackground="new 0 0 512 512"
        xmlSpace="preserve"
      >
        <polygon points="512,261.5 298.7,90.8 298.7,218.8 0,218.8 0,304.2 298.7,304.2 298.7,432.2 " />
      </svg>
    </Box>
  );
};
RightArrow.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default RightArrow;
