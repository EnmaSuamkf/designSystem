import React from "react";
import { render, screen } from "@testing-library/react";
import Box from "../index.js";
import { getProccecedProps } from "../../theme/util.js";

jest.mock("../../theme/util.js"); // Mock the getProccecedProps function

describe("Box", () => {
  it("renders children correctly", () => {
    render(<Box>Test Content</Box>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls getProccecedProps with the correct props", () => {
    const props = { color: "red", size: "large" };
    render(<Box {...props}>Test Content</Box>);
    expect(getProccecedProps).toHaveBeenCalledWith(
      expect.objectContaining(props),
    );
  });
});
