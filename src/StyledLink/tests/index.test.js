import React from "react";
import { render, screen } from "@testing-library/react";
import StyledLink from "../index.js";
describe("StyledLink", () => {
  it("renders correctly", () => {
    render(<StyledLink to="/test">Test RouterLink</StyledLink>);

    const linkElement = screen.getByText("Test RouterLink");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("/test");
  });
});
