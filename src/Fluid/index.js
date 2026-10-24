import React from "react";
import Box from "../Box";
import FlexBox from "../Flex";

// Fixed-width blocks (modals, forms) that must never be wider than the screen
// below the mobile breakpoint. Desktop keeps the width given by the caller.
const FLUID_BOX = {
  width: "calc(100vw - 80px)",
  maxWidth: "100%",
  minWidth: "0px",
  mx: "0px",
  px: "12px",
  boxSizing: "border-box",
};

const FLUID_FLEX = {
  width: "calc(100vw - 80px)",
  maxWidth: "100%",
  minWidth: "0px",
  pl: "16px",
  pr: "16px",
  boxSizing: "border-box",
};

// eslint-disable-next-line react/prop-types
export const FluidBox = React.forwardRef(({ mobile, ...props }, ref) => (
  <Box ref={ref} {...props} mobile={{ ...FLUID_BOX, ...mobile }} />
));
FluidBox.displayName = "FluidBox";

// eslint-disable-next-line react/prop-types
export const FluidFlex = React.forwardRef(({ mobile, ...props }, ref) => (
  <FlexBox ref={ref} {...props} mobile={{ ...FLUID_FLEX, ...mobile }} />
));
FluidFlex.displayName = "FluidFlex";
