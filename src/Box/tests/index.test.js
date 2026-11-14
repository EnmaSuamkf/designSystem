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

  it("renders the role it receives", () => {
    render(<Box role="alert">Saved</Box>);
    expect(screen.getByRole("alert")).toHaveTextContent("Saved");
  });

  it("does not set a role when none is given", () => {
    render(<Box data-testid="plain">Plain</Box>);
    expect(screen.getByTestId("plain")).not.toHaveAttribute("role");
  });
});
