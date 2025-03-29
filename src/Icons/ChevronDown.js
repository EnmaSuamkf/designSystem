import React from "react";
import PropTypes from "prop-types";
import { getThemeValue } from "../theme/util";

const Youtube = ({
  color = "$theme_neutral_color_100",
  width = "20px",
  height = "20px",
}) => {
  return (
    <div>
      <svg
        fill={getThemeValue(color)}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 407.437 407.437"
        xmlSpace="preserve"
      >
        <g strokeWidth="0"></g>
        <g strokeLinejoin="round"></g>
        <g>
          <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 "></polygon>
        </g>
      </svg>
    </div>
  );
};
Youtube.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default Youtube;
