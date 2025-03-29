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
        viewBox="0 0 407.436 407.436"
        xmlSpace="preserve"
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          <polygon points="203.718,91.567 0,294.621 21.179,315.869 203.718,133.924 386.258,315.869 407.436,294.621 "></polygon>
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
