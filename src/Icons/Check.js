/* eslint-disable react/no-unknown-property */
import React from "react";
import PropTypes from "prop-types";
import Box from "../Box";
import { getThemeValue } from "../theme/util";

const Google = ({
  width = "20px",
  height = "20px",
  borderColor = "$theme_neutral_color_0",
  bodyColor = "$theme_primary_color_30",
}) => {
  return (
    <Box width={width} height={height}>
      <svg
        viewBox="0 0 72 72"
        id="emoji"
        xmlns="http://www.w3.org/2000/svg"
        fill={getThemeValue(borderColor)}
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="color">
            {" "}
            <path
              fill={getThemeValue(bodyColor)}
              d="m61.5 23.3-8.013-8.013-25.71 25.71-9.26-9.26-8.013 8.013 17.42 17.44z"
            ></path>{" "}
          </g>{" "}
          <g id="line">
            {" "}
            <path
              fill="none"
              stroke={getThemeValue(borderColor)}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              stroke-width="2"
              d="m10.5 39.76 17.42 17.44 33.58-33.89-8.013-8.013-25.71 25.71-9.26-9.26z"
            ></path>{" "}
          </g>{" "}
        </g>
      </svg>{" "}
    </Box>
  );
};
Google.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderColor: PropTypes.string,
  bodyColor: PropTypes.string,
};
export default Google;
