import React from "react";
import { StyledSelect } from "../Select/StyledSelect";

// eslint-disable-next-line react/prop-types
const SelectList = ({ list = [], callback = () => {}, ...rest }) => {
  const handleChange = (e) => {
    const item = list.find((item) =>
      typeof item === "string" ? item : JSON.stringify(item) === e.target.value,
    );
    callback(item);
  };

  return (
    <StyledSelect onChange={handleChange} {...rest}>
      {list.map((item, index) => {
        const isString = typeof item === "string";
        return (
          <option key={index} value={isString ? item : JSON.stringify(item)}>
            {isString ? item : item.value}
          </option>
        );
      })}
    </StyledSelect>
  );
};

export default SelectList;
