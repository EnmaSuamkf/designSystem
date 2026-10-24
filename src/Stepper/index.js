import React from "react";
import PropTypes from "prop-types";

import FlexBox from "../Flex";
import Button from "../Button";
import Input from "../Input";

const clampValue = (value, min, max) => {
  let next = value;
  if (typeof min === "number") {
    next = Math.max(min, next);
  }
  if (typeof max === "number") {
    next = Math.min(max, next);
  }
  return next;
};

const Stepper = ({
  value = 0,
  onChange,
  min = 0,
  max,
  step = 1,
  disabled = false,
}) => {
  const numericValue = Number(value) || 0;
  const numericStep = Number(step) || 1;

  const commit = (nextValue) => {
    if (disabled || !onChange) {
      return;
    }
    onChange(clampValue(nextValue, min, max));
  };

  const canDecrease =
    !disabled && (typeof min !== "number" || numericValue - numericStep >= min);
  const canIncrease =
    !disabled && (typeof max !== "number" || numericValue + numericStep <= max);

  return (
    <FlexBox alignItems="center" gap="8px" data-testid="stepper">
      <Button
        type="button"
        variant="secondary"
        disabled={!canDecrease}
        onClick={() => commit(numericValue - numericStep)}
        aria-label="Decrease"
      >
        −
      </Button>
      <Input
        type="number"
        value={numericValue}
        disabled={disabled}
        width="80px"
        textalign="center"
        onChange={(event) => commit(Number(event.target.value))}
        data-testid="stepper-input"
      />
      <Button
        type="button"
        variant="secondary"
        disabled={!canIncrease}
        onClick={() => commit(numericValue + numericStep)}
        aria-label="Increase"
      >
        +
      </Button>
    </FlexBox>
  );
};

Stepper.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Stepper;
