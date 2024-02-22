import React from "react";
import PropTypes from "prop-types";

import FlexBox from "../Flex";
import Heading from "../Heading";
import Box from "../Box";
import Show from "../Show";

const Tag = ({
  tags = [],
  background = "$theme_neutral_color_0",
  tagBackground = "$theme_neutral_color_30",
  borderColor = "$theme_neutral_color_50",
  color = "$theme_neutral_color_100",
}) => {
  return (
    <FlexBox
      justifyContent="start"
      py="$theme_spacing_1x_small"
      pl="$theme_spacing_1x_small"
      flexWrap="wrap"
      height="100%"
      borderRadius="$theme_radius_regular"
      border={`1px solid ${borderColor}`}
      background={background}
    >
      <Show when={tags.length > 0}>
        {tags.map(
          (
            {
              title = "",
              onClick = () => {},
              icon = (
                <Heading type="2" color="$theme_neutral_color_0">
                  x
                </Heading>
              ),
              revertActionPosition = false,
            },
            index,
          ) => (
            <FlexBox
              flexDirection={revertActionPosition ? "row-reverse" : "row"}
              key={index}
              background={tagBackground}
              borderRadius="$theme_radius_regular"
              marginRight="$theme_spacing_1x_small"
              border={`1px solid ${borderColor}`}
            >
              <Box padding="$theme_spacing_2x_small">
                <Heading type="2" color={color}>
                  {title}
                </Heading>
              </Box>
              <FlexBox
                padding="$theme_spacing_2x_small"
                onClick={onClick}
                ml={revertActionPosition && "$theme_spacing_1x_small"}
                cursor="pointer"
                alignItems="center"
              >
                {icon}
              </FlexBox>
            </FlexBox>
          ),
        )}
      </Show>
      <Show when={tags.length === 0}>
        <Box height="25px" width="50px"></Box>
      </Show>
    </FlexBox>
  );
};

Tag.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.node,
      revertActionPosition: PropTypes.bool,
    }),
  ).isRequired,
  background: PropTypes.string,
  tagBackground: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
};

export default Tag;
