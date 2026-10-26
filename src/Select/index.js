/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { getProccecedProps } from "../theme/util";
import { StyledSelect } from "./StyledSelect";

// Same base look as SelectList, plus the spacing props Input accepts.
const ControlledSelect = styled(StyledSelect)`
  ${(props) =>
    getProccecedProps({
      margin: props.margin,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
    })}
`;

// Controlled select for forms. onChange receives the new value (a string), not the event.
// The native arrow is kept: CSS cannot restyle it without replacing the control.
const Select = React.forwardRef(
  (
    {
      value,
      onChange,
      options = [],
      placeholder,
      disabled = false,
      name,
      id,
      width = "100%",
      ...otherProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e.target.value);
    };

    return (
      <ControlledSelect
        ref={ref}
        id={id}
        name={name}
        value={value ?? ""}
        disabled={disabled}
        width={width}
        onChange={handleChange}
        {...otherProps}
      >
        {placeholder !== undefined ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ControlledSelect>
    );
  },
);

Select.displayName = "Select";

export default Select;
