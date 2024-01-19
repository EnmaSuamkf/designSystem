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
        xmlns="http://www.w3.org/2000/svg"
        fill={getThemeValue(color)}
        width={width}
        height={height}
        viewBox="0 0 24 24"
      >
        <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z" />
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
