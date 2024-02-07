/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { getThemeValue } from "../theme/util";

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 50px;
  height: 25px;
  background: ${(props) => getThemeValue(props.background)};
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s;
`;

const SwitchButton = styled.span`
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 45px;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`;

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked + ${SwitchLabel} {
    background: ${(props) => getThemeValue(props.brackground)};

    & ${SwitchButton} {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }
  }

  &:active + ${SwitchLabel} ${SwitchButton} {
    width: 30px;
  }
`;

const Switch = ({
  isOn,
  handleToggle,
  offColor = "$theme_neutral_color_30",
  onColor = "$theme_positive_color",
}) => (
  <>
    <SwitchInput
      id="switch"
      type="checkbox"
      checked={isOn}
      onChange={handleToggle}
      background={onColor}
      data-testid="switch"
    />
    <SwitchLabel htmlFor="switch" background={offColor}>
      <SwitchButton />
    </SwitchLabel>
  </>
);

export default Switch;
