import React from "react";
import PropTypes from "prop-types";
import { getThemeValue } from "../theme/util";
import Box from "../Box";

const MagnifyingGlass = ({
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
        <path
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke={getThemeValue(color)}
          strokeWidth="2"
        />
        <path
          d="M14 14L16 16"
          stroke={getThemeValue(color)}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z"
          stroke={getThemeValue(color)}
          strokeWidth="2"
        />
      </svg>
    </Box>
  );
};
MagnifyingGlass.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default MagnifyingGlass;
