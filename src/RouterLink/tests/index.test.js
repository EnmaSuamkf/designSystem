import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterLink from "../index.js";
describe("RouterLink", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <RouterLink to="/test">Test RouterLink</RouterLink>
      </Router>,
    );

    const linkElement = screen.getByText("Test RouterLink");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("/test");
  });
});
