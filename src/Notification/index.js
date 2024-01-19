import React from "react";
import PropTypes from "prop-types";
import Box from "../Box";
const Notication = ({ message, title, type = "positive" }) => {
  const backgroundColor = {
    positive: "$theme_positive_color",
    neutral: "$theme_secondary_color_70",
    warning: "$theme_negative_color",
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="baseline"
      justifyContent="center"
      borderRadius="$theme_radius_regular"
      boxDhadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
      padding="$theme_spacing_small"
      width="100%"
      height="100%"
      backgroundColor={backgroundColor[type]}
    >
      <Box
        fontSize="14px"
        fontWeight="600"
        color="$theme_neutral_color_0"
        marginBottom="$theme_spacing_small"
        className="notification-title"
      >
        {title}
      </Box>
      <Box
        fontSize="14px"
        fontWeight="400"
        color="$theme_neutral_color_0"
        marginBottom="$theme_spacing_small"
      >
        {message}
      </Box>
    </Box>
  );
};

Notication.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["positive", "neutral", "warning"]).isRequired,
};
export default Notication;
