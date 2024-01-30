import React from "react";
import { render, screen } from "@testing-library/react";
import Heading from "../index";

describe("Heading", () => {
  test("renders with style 5", () => {
    render(<Heading type={5}>Test Heading</Heading>);
    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders with style 4", () => {
    render(<Heading type={4}>Test Heading</Heading>);
    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders with style 3", () => {
    render(<Heading type={3}>Test Heading</Heading>);
    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders with style 2", () => {
    render(<Heading type={2}>Test Heading</Heading>);
    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders with style 1", () => {
    render(<Heading type={1}>Test Heading</Heading>);
    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toBeInTheDocument();
  });
});
