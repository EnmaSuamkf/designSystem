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
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
      >
        <g id="Edit / Add_Plus">
          <path
            id="Vector"
            d="M6 12H12M12 12H18M12 12V18M12 12V6"
            stroke={getThemeValue(color)}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
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
