import React from "react";
import { render, screen } from "@testing-library/react";
import Box from "../index";
import FlexBox from "../../Flex";
import { mobileQuery } from "../../theme/breakpoints";

const getRules = () =>
  [...document.styleSheets]
    .flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText))
    .join("\n");

describe("mobile prop", () => {
  test("Box SHOULD apply the mobile overrides only inside the mobile media query", () => {
    render(
      <Box padding="24px" mobile={{ padding: "13px" }}>
        box
      </Box>,
    );
    expect(screen.getByText("box")).toBeInTheDocument();
    const rules = getRules();
    expect(rules).toContain(`@media ${mobileQuery}`);
    expect(rules).toContain("padding: 13px");
  });

  test("FlexBox SHOULD apply the mobile overrides", () => {
    render(
      <FlexBox mobile={{ flexDirection: "column", gap: "7px" }}>flex</FlexBox>,
    );
    expect(screen.getByText("flex")).toBeInTheDocument();
    expect(getRules()).toContain("gap: 7px");
  });

  test("Box SHOULD NOT render the mobile prop as an attribute", () => {
    render(<Box mobile={{ padding: "1px" }}>attr</Box>);
    expect(screen.getByText("attr")).not.toHaveAttribute("mobile");
  });
});
