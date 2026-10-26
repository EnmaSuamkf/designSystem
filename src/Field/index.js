/* eslint-disable react/prop-types */
import React, { useId } from "react";
import styled from "styled-components";
import { getThemeValue } from "../theme/util";
import { FONT_STACK } from "../theme/fieldStyles";
import Box from "../Box/index.js";

const Label = styled.label`
  display: block;
  margin-bottom: ${() => getThemeValue("$theme_spacing_1x_small")};
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  font-family: ${FONT_STACK};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

const ErrorText = styled.span`
  display: block;
  margin-top: 4px;
  margin-left: 4px;
  color: red;
  font-family: ${FONT_STACK};
  font-size: 12px;
  line-height: 16px;
`;

// Wraps one form control with its label above and an optional error line below.
// The label is linked to the control through htmlFor/id: the id comes from the `id`
// prop, from the child's own id, or is generated when neither is given.
const Field = ({ label, id, error, width = "100%", children }) => {
  const generatedId = useId();
  const childId = React.isValidElement(children)
    ? children.props.id
    : undefined;
  const controlId = id || childId || generatedId;
  const control =
    React.isValidElement(children) && !childId
      ? React.cloneElement(children, { id: controlId })
      : children;

  return (
    <Box width={width}>
      {label ? <Label htmlFor={controlId}>{label}</Label> : null}
      {control}
      {error ? <ErrorText role="alert">{error}</ErrorText> : null}
    </Box>
  );
};

export default Field;
