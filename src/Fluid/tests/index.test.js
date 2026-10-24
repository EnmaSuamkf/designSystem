import React from "react";
import { render, screen } from "@testing-library/react";
import { FluidBox, FluidFlex } from "../index";
import { mobileQuery } from "../../theme/breakpoints";

const getRules = () =>
  [...document.styleSheets]
    .flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText))
    .join("\n");

describe("Fluid blocks", () => {
  test("SHOULD render their children", () => {
    render(
      <>
        <FluidBox width="600px">box</FluidBox>
        <FluidFlex minWidth="500px">flex</FluidFlex>
      </>,
    );
    expect(screen.getByText("box")).toBeInTheDocument();
    expect(screen.getByText("flex")).toBeInTheDocument();
  });

  test("SHOULD cap the width to the screen only on mobile", () => {
    render(<FluidBox width="600px">capped</FluidBox>);
    const rules = getRules();
    expect(rules).toContain(`@media ${mobileQuery}`);
    expect(rules).toContain("calc(100vw - 80px)");
  });

  test("SHOULD let the caller extend the mobile overrides", () => {
    render(
      <FluidBox width="600px" mobile={{ opacity: "0.5" }}>
        extended
      </FluidBox>,
    );
    expect(getRules()).toContain("opacity: 0.5");
  });
});
