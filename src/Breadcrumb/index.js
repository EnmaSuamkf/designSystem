import React from "react";
import PropTypes from "prop-types";
import FlexBox from "../Flex";
import Box from "../Box";
import StyledLink from "../StyledLink";
const getItemProps = (index, length) =>
  index < length - 1
    ? {
        color: "$theme_neutral_color_100",
        onHoverTextDecoration: "underline",
        cursor: "pointer",
      }
    : {
        color: "$theme_neutral_color_70",
        cursor: "default",
      };
const Breadcrumb = ({ items, separator = ">" }) => {
  return (
    <FlexBox alignItem="center">
      {items.map(({ name, onClick = () => {} }, index) => {
        return (
          <FlexBox
            alignItems="center"
            color="$theme_neutral_color_100"
            textDecoration="none"
            cursor="pointer"
            key={`breadcrumb-${index}`}
            onClick={onClick}
          >
            <Box className="breadcrumb-item-name">
              <StyledLink
                onClick={(e) => {
                  e.preventDefault();
                }}
                textDecoration="none"
                {...getItemProps(index, items.length)}
              >
                {name}
              </StyledLink>
            </Box>
            {index < items.length - 1 && (
              <Box
                margin="0px $theme_spacing_1x_small"
                color="$theme_neutral_color_100"
              >
                <StyledLink
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  textDecoration="none"
                  onHoverTextDecoration="none"
                >
                  {separator}
                </StyledLink>
              </Box>
            )}
          </FlexBox>
        );
      })}
    </FlexBox>
  );
};
Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      redirectUrl: PropTypes.string,
    }),
  ).isRequired,
  separator: PropTypes.string,
};
export default Breadcrumb;
