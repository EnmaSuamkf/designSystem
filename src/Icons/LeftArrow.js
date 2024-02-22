import React from "react";
import PropTypes from "prop-types";
import { getThemeValue } from "../theme/util";
import Box from "../Box";

const LeftArrow = ({
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
        <polygon points="213.3,205.3 213.3,77.3 0,248 213.3,418.7 213.3,290.7 512,290.7 512,205.3 " />
      </svg>
    </Box>
  );
};
LeftArrow.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default LeftArrow;
