import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FONT_STACK } from "../theme/fieldStyles";
import { getThemeValue, tintColor } from "../theme/util";

// Color tone -> theme token. Tones are limited to the theme: a tone outside
// this map has no color, so the backoffice can only pick from these.
export const TONE_TOKENS = {
  primary: "$theme_primary_color_70",
  secondary: "$theme_secondary_color_70",
  dark: "$theme_neutral_color_90",
  light: "$theme_neutral_color_0",
};

// The default tone list. Labels are not defined here: every option, including
// its visible label, is passed in through the `options` prop.
export const DEFAULT_TONES = Object.keys(TONE_TOKENS);

const GroupLabel = styled.span`
  display: block;
  margin-bottom: ${() => getThemeValue("$theme_spacing_1x_small")};
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  font-family: ${FONT_STACK};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${() => getThemeValue("$theme_spacing_1x_small")};
`;

const Option = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${() => getThemeValue("$theme_spacing_1x_small")};
  box-sizing: border-box;
  min-height: 36px;
  padding: ${() => getThemeValue("$theme_spacing_1x_small")}
    ${() => getThemeValue("$theme_spacing_small")};
  border: 1px solid
    ${(props) =>
      props.$checked
        ? getThemeValue("$theme_secondary_color_90")
        : getThemeValue("$theme_neutral_color_50")};
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  background-color: ${() => getThemeValue("$theme_neutral_color_0")};
  box-shadow: ${(props) =>
    props.$checked
      ? `0 0 0 1px ${getThemeValue("$theme_secondary_color_90")}`
      : "none"};
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  font-family: ${FONT_STACK};
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px
      ${() => tintColor(getThemeValue("$theme_secondary_color_70"), 0.35)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

// The swatch color is always a theme token, resolved at render time.
const Swatch = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  border-radius: 50%;
  background-color: ${(props) => getThemeValue(props.$token)};
`;

const ToneSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
}) => {
  const labelId = `${id}-label`;
  const optionRefs = useRef([]);
  const count = options.length;
  const selectedIndex = options.findIndex((option) => option.value === value);
  // Roving tabindex: only the selected option (or the first one when nothing
  // is selected) sits in the Tab order; arrow keys move within the group.
  const tabbableIndex = selectedIndex >= 0 ? selectedIndex : 0;

  const moveTo = (index) => {
    onChange(options[index].value);
    const target = optionRefs.current[index];
    if (target) target.focus();
  };

  const handleKeyDown = (event, index) => {
    let next = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    moveTo(next);
  };

  return (
    <div>
      <GroupLabel id={labelId}>{label}</GroupLabel>
      <Group role="radiogroup" aria-labelledby={labelId}>
        {options.map((option, index) => {
          const checked = index === selectedIndex;
          const token = TONE_TOKENS[option.value] || "$theme_neutral_color_50";
          return (
            <Option
              key={option.value}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={index === tabbableIndex ? 0 : -1}
              disabled={disabled}
              data-tone={option.value}
              $checked={checked}
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <Swatch
                aria-hidden="true"
                data-testid="tone-swatch"
                $token={token}
              />
              <span>{option.label}</span>
            </Option>
          );
        })}
      </Group>
    </div>
  );
};

ToneSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  disabled: PropTypes.bool,
};

export default ToneSelect;
