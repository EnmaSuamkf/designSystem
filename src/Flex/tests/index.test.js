import React from "react";
import { render, screen } from "@testing-library/react";
import Flex from "../index.js";
import { getProccecedProps } from "../../theme/util.js";

jest.mock("../../theme/util.js");

describe("Flex", () => {
  it("renders children correctly", () => {
    render(<Flex>Test Content</Flex>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls getProccecedProps with the correct props", () => {
    const props = { color: "red", size: "large" };
    render(<Flex {...props}>Test Content</Flex>);
    expect(getProccecedProps).toHaveBeenCalledWith(
      expect.objectContaining(props),
    );
  });
});
