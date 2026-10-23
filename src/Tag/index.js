import React from "react";
import PropTypes from "prop-types";

import FlexBox from "../Flex";
import Heading from "../Heading";
import Box from "../Box";
import Show from "../Show";
import styled from "styled-components";
import { blendColor, ensureContrast, getThemeValue } from "../theme/util";

// status -> theme token used as the base color of the pill
export const TAG_STATUS_TOKENS = {
  active: "$theme_positive_color",
  inactive: "$theme_neutral_color_70",
  error: "$theme_negative_color",
  info: "$theme_secondary_color_90",
  neutral: "$theme_neutral_color_70",
};

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding: 2px 10px;
  border-radius: ${() => getThemeValue("$theme_radius_full")};
  font-family:
    system-ui,
    -apple-system,
    "Segoe UI",
    Roboto,
    Arial,
    sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  background-color: ${(props) => props.pillBackground};
  color: ${(props) => props.pillColor};
  border: 1px solid ${(props) => props.pillBorder};
`;

// Tint background + text darkened until it reaches 4.5:1 on that tint.
export const getStatusColors = (status = "neutral") => {
  const base = getThemeValue(
    TAG_STATUS_TOKENS[status] || TAG_STATUS_TOKENS.neutral,
  );
  const surface = getThemeValue("$theme_neutral_color_0");
  const background = blendColor(base, surface, 0.14);
  return {
    background,
    color: ensureContrast(base, background, 4.5),
    border: blendColor(base, surface, 0.35),
  };
};

const Tag = ({
  tags = [],
  background = "$theme_neutral_color_0",
  tagBackground = "$theme_neutral_color_30",
  borderColor = "$theme_neutral_color_50",
  color = "$theme_neutral_color_100",
  variant = "default",
}) => {
  if (variant === "status") {
    return (
      <FlexBox justifyContent="start" flexWrap="wrap" gap="8px">
        {tags.map(
          ({ title = "", status = "neutral", onClick, icon }, index) => {
            const colors = getStatusColors(status);
            return (
              <StatusPill
                key={index}
                data-status={status}
                pillBackground={colors.background}
                pillColor={colors.color}
                pillBorder={colors.border}
              >
                {title}
                {icon ? (
                  <span
                    onClick={onClick}
                    style={{ marginLeft: 6, cursor: "pointer" }}
                  >
                    {icon}
                  </span>
                ) : null}
              </StatusPill>
            );
          },
        )}
      </FlexBox>
    );
  }
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
      status: PropTypes.oneOf(Object.keys(TAG_STATUS_TOKENS)),
    }),
  ).isRequired,
  background: PropTypes.string,
  tagBackground: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  variant: PropTypes.oneOf(["default", "status"]),
};

export default Tag;
