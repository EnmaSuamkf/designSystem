import React from "react";
import { render, screen } from "@testing-library/react";
import FormRow from "../index";
import { mobileQuery } from "../../theme/breakpoints";

const getRules = () =>
  [...document.styleSheets]
    .flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText))
    .join("\n");

describe("FormRow", () => {
  test("SHOULD render label and field", () => {
    render(
      <FormRow justifyContent="space-between">
        <span>label</span>
        <input aria-label="field" />
      </FormRow>,
    );
    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.getByLabelText("field")).toBeInTheDocument();
  });

  test("SHOULD stack only inside the mobile media query", () => {
    render(<FormRow>row</FormRow>);
    const rules = getRules();
    expect(rules).toContain(`@media ${mobileQuery}`);
    expect(rules).toContain("flex-direction: column");
  });
});
