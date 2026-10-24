import React from "react";
import PropTypes from "prop-types";

const Hamburger = ({ width = "20px", height = "20px" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M3 5h14M3 10h14M3 15h14" />
  </svg>
);
Hamburger.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
export default Hamburger;
