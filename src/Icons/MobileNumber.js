import React from "react";
import PropTypes from "prop-types";
import { getThemeValue } from "../theme/util";

const MobileNumber = ({
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
        viewBox="-8.04 0 32.135 32.135"
      >
        <g transform="translate(-617.079 -194.333)">
          <path
            stroke={getThemeValue(color)}
            d="M630.278,196.333a.855.855,0,0,1,.854.854v26.427a.855.855,0,0,1-.854.854H619.933a.855.855,0,0,1-.854-.854V197.187a.855.855,0,0,1,.854-.854h10.345m0-2H619.933a2.854,2.854,0,0,0-2.854,2.854v26.427a2.854,2.854,0,0,0,2.854,2.854h10.345a2.854,2.854,0,0,0,2.854-2.854V197.187a2.854,2.854,0,0,0-2.854-2.854Z"
          />

          <circle
            stroke={getThemeValue(color)}
            cx="1.144"
            cy="1.144"
            r="1.144"
            transform="translate(623.962 220.375)"
          />

          <path
            stroke={getThemeValue(color)}
            d="M625.106,220.375a1.144,1.144,0,1,0,1.143,1.143,1.144,1.144,0,0,0-1.143-1.143Z"
          />
        </g>
      </svg>
    </div>
  );
};
MobileNumber.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
export default MobileNumber;
