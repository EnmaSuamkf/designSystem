import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Field from "../Field";
import Input from "../Input";
import { desktopQuery } from "../theme/breakpoints";
import { FONT_STACK } from "../theme/fieldStyles";
import { getThemeValue } from "../theme/util";

// Two native date inputs ("from" and "to"): side by side on desktop, stacked on mobile.
const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${() => getThemeValue("$theme_spacing_small")};
  width: 100%;

  @media ${desktopQuery} {
    flex-direction: row;
  }
`;

const Column = styled.div`
  flex: 1 1 0;
  min-width: 0;
`;

const HintText = styled.span`
  display: block;
  margin-top: ${() => getThemeValue("$theme_spacing_1x_small")};
  color: ${() => getThemeValue("$theme_neutral_color_70")};
  font-family: ${FONT_STACK};
  font-size: 12px;
  line-height: 16px;
`;

const ErrorText = styled.span`
  display: block;
  margin-top: ${() => getThemeValue("$theme_spacing_1x_small")};
  color: ${() => getThemeValue("$theme_negative_color")};
  font-family: ${FONT_STACK};
  font-size: 12px;
  line-height: 16px;
`;

// Dates are YYYY-MM-DD, so plain string comparison orders them correctly.
// An empty value on either side means there is no range to validate yet.
const isInvalidRange = (start, end) => Boolean(start && end && end < start);

const DateRangeField = ({
  id,
  startLabel,
  endLabel,
  startValue = "",
  endValue = "",
  onChange,
  invalidRangeMessage,
  disabled = false,
  hint,
}) => {
  const startId = `${id}-start`;
  const endId = `${id}-end`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const invalid = isInvalidRange(startValue, endValue);

  const endDescribedBy =
    [hint ? hintId : null, invalid ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div>
      <Row>
        <Column>
          <Field label={startLabel} id={startId}>
            <Input
              type="date"
              id={startId}
              value={startValue || ""}
              disabled={disabled}
              aria-describedby={hint ? hintId : undefined}
              onChange={(event) =>
                onChange({ start: event.target.value, end: endValue || "" })
              }
            />
          </Field>
        </Column>
        <Column>
          <Field label={endLabel} id={endId}>
            <Input
              type="date"
              id={endId}
              value={endValue || ""}
              disabled={disabled}
              aria-invalid={invalid ? "true" : undefined}
              aria-describedby={endDescribedBy}
              onChange={(event) =>
                onChange({ start: startValue || "", end: event.target.value })
              }
            />
          </Field>
        </Column>
      </Row>
      {hint ? <HintText id={hintId}>{hint}</HintText> : null}
      {invalid ? (
        <ErrorText id={errorId} role="alert">
          {invalidRangeMessage}
        </ErrorText>
      ) : null}
    </div>
  );
};

DateRangeField.propTypes = {
  id: PropTypes.string.isRequired,
  startLabel: PropTypes.string.isRequired,
  endLabel: PropTypes.string.isRequired,
  startValue: PropTypes.string,
  endValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  invalidRangeMessage: PropTypes.string,
  disabled: PropTypes.bool,
  hint: PropTypes.string,
};

export default DateRangeField;
