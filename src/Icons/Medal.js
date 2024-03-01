import React from "react";
import PropTypes from "prop-types";
import { getThemeValue } from "../theme/util";
import Box from "../Box";

const Medal = ({
  color = "$theme_neutral_color_100",
  width = "20px",
  height = "20px",
}) => {
  return (
    <Box>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle opacity="1" cx="12" cy="9" r="7" fill={getThemeValue(color)} />
        <path
          d="M7.54572 14.4001L7.35111 15L6.71424 17.3229C6.0859 19.6148 5.77173 20.7607 6.19097 21.388C6.3379 21.6079 6.535 21.7843 6.76372 21.9008C7.41634 22.2331 8.424 21.708 10.4393 20.6579C11.1099 20.3085 11.4452 20.1338 11.8014 20.0958C11.9335 20.0818 12.0665 20.0818 12.1986 20.0958C12.5548 20.1338 12.8901 20.3085 13.5607 20.6579C15.576 21.708 16.5837 22.2331 17.2363 21.9008C17.465 21.7843 17.6621 21.6079 17.809 21.388C18.2283 20.7607 17.9141 19.6148 17.2858 17.3229L16.6489 15L16.4543 14.4001C15.244 15.3995 13.6921 16 12 16C10.3079 16 8.75597 15.3995 7.54572 14.4001Z"
          fill={getThemeValue(color)}
        />
      </svg>
    </Box>
  );
};
Medal.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default Medal;
