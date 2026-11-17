import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ChevronDown, ChevronUp, Close } from "../Icons";
import { FONT_STACK } from "../theme/fieldStyles";
import { getThemeValue, tintColor } from "../theme/util";

// Generic ordered list editor: each row has move up / move down and remove
// buttons. Adding is optional (onAdd). Every visible or spoken string comes in
// through props, so the component holds no copy of its own.
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${() => getThemeValue("$theme_spacing_small")};
  width: 100%;
`;

const List = styled.ol`
  display: flex;
  flex-direction: column;
  gap: ${() => getThemeValue("$theme_spacing_1x_small")};
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  gap: ${() => getThemeValue("$theme_spacing_1x_small")};
  box-sizing: border-box;
  padding: ${() => getThemeValue("$theme_spacing_1x_small")}
    ${() => getThemeValue("$theme_spacing_small")};
  border: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  background-color: ${() => getThemeValue("$theme_neutral_color_0")};
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  font-family: ${FONT_STACK};
  font-size: 14px;
  line-height: 20px;
`;

const RowContent = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;

const Controls = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: ${() => getThemeValue("$theme_spacing_2x_small")};
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  background-color: transparent;
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background-color: ${() =>
      tintColor(getThemeValue("$theme_neutral_color_100"), 0.08)};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px
      ${() => tintColor(getThemeValue("$theme_secondary_color_70"), 0.35)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const AddButton = styled.button`
  align-self: flex-start;
  box-sizing: border-box;
  min-height: 36px;
  padding: ${() => getThemeValue("$theme_spacing_1x_small")}
    ${() => getThemeValue("$theme_spacing_base")};
  border: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  background-color: ${() => getThemeValue("$theme_neutral_color_0")};
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  font-family: ${FONT_STACK};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${() => getThemeValue("$theme_neutral_color_70")};
  }

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

const MessageText = styled.span`
  color: ${() => getThemeValue("$theme_neutral_color_70")};
  font-family: ${FONT_STACK};
  font-size: 13px;
  line-height: 18px;
`;

const EditableList = ({
  items = [],
  getKey,
  renderItem,
  onAdd,
  onRemove,
  onMove,
  max,
  addLabel,
  removeLabel,
  moveUpLabel,
  moveDownLabel,
  emptyLabel,
  maxReachedLabel,
}) => {
  const hasMax = typeof max === "number";
  const maxReached = hasMax && items.length >= max;
  const lastIndex = items.length - 1;

  return (
    <Wrapper>
      {items.length === 0 ? (
        emptyLabel ? (
          <MessageText>{emptyLabel}</MessageText>
        ) : null
      ) : (
        <List>
          {items.map((item, index) => (
            <Row key={getKey(item, index)}>
              <RowContent>{renderItem(item, index)}</RowContent>
              <Controls>
                <IconButton
                  type="button"
                  aria-label={`${moveUpLabel} ${index + 1}`}
                  disabled={index === 0}
                  onClick={() => onMove(index, index - 1)}
                >
                  <ChevronUp width="16px" height="16px" />
                </IconButton>
                <IconButton
                  type="button"
                  aria-label={`${moveDownLabel} ${index + 1}`}
                  disabled={index === lastIndex}
                  onClick={() => onMove(index, index + 1)}
                >
                  <ChevronDown width="16px" height="16px" />
                </IconButton>
                <IconButton
                  type="button"
                  aria-label={`${removeLabel} ${index + 1}`}
                  onClick={() => onRemove(index)}
                >
                  <span aria-hidden="true">
                    <Close width="16px" height="16px" />
                  </span>
                </IconButton>
              </Controls>
            </Row>
          ))}
        </List>
      )}
      {onAdd ? (
        <div>
          <AddButton
            type="button"
            disabled={maxReached}
            onClick={() => {
              if (!maxReached) onAdd();
            }}
          >
            {addLabel}
          </AddButton>
          {maxReached && maxReachedLabel ? (
            <MessageText role="status">{maxReachedLabel}</MessageText>
          ) : null}
        </div>
      ) : null}
    </Wrapper>
  );
};

EditableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  getKey: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  max: PropTypes.number,
  addLabel: PropTypes.string,
  removeLabel: PropTypes.string.isRequired,
  moveUpLabel: PropTypes.string.isRequired,
  moveDownLabel: PropTypes.string.isRequired,
  emptyLabel: PropTypes.string,
  maxReachedLabel: PropTypes.string,
};

export default EditableList;
