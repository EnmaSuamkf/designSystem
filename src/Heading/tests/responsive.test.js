import React from "react";
import { render, screen } from "@testing-library/react";
import Heading from "../index";

describe("Heading", () => {
  test("SHOULD render an h5 by default", () => {
    render(<Heading type="5">title</Heading>);
    expect(screen.getByText("title").tagName).toBe("H5");
  });

  test("SHOULD render another tag with the as prop", () => {
    render(
      <Heading type="5" as="h1">
        page title
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "page title",
    );
  });

  test("SHOULD apply lineHeight and mobile overrides without leaking attributes", () => {
    render(
      <Heading
        type="5"
        as="h1"
        sx={{ lineHeight: "32px" }}
        mobile={{ fontSize: "20px" }}
      >
        responsive
      </Heading>,
    );
    const rules = [...document.styleSheets]
      .flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText))
      .join("\n");
    expect(rules).toContain("line-height: 32px");
    expect(rules).toContain("font-size: 20px");
    expect(screen.getByText("responsive")).not.toHaveAttribute("mobile");
  });
});
