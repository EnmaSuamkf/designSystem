import React from "react";
import { render } from "@testing-library/react";
import styled from "styled-components";
import {
  MOBILE_BREAKPOINT,
  mobileQuery,
  desktopQuery,
  mobileOnly,
} from "../breakpoints";
import { getMobileStyles } from "../util";

const getRules = () =>
  [...document.styleSheets]
    .flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText))
    .join("\n");

describe("breakpoints", () => {
  test("SHOULD expose the 768 px breakpoint and its queries", () => {
    expect(MOBILE_BREAKPOINT).toBe(768);
    expect(mobileQuery).toBe("(max-width: 767px)");
    expect(desktopQuery).toBe("(min-width: 768px)");
  });

  test("mobileOnly SHOULD wrap the css in the mobile media query", () => {
    const Probe = styled.div`
      color: red;
      ${mobileOnly`
        color: blue;
      `}
    `;
    render(<Probe>probe</Probe>);
    const rules = getRules();
    expect(rules).toContain(`@media ${mobileQuery}`);
    expect(rules).toContain("color: blue");
  });
});

describe("getMobileStyles", () => {
  test("SHOULD translate spacing shorthands and css props", () => {
    const css = getMobileStyles({ px: "16px", mb: "8px", maxWidth: "100%" });
    expect(css).toContain("padding-left: 16px;");
    expect(css).toContain("padding-right: 16px;");
    expect(css).toContain("margin-bottom: 8px;");
    expect(css).toContain("max-width: 100%;");
  });

  test("SHOULD resolve theme tokens", () => {
    expect(getMobileStyles({ py: "$theme_spacing_base" })).toMatch(
      /padding-top: [^;$]+;/,
    );
  });
});
