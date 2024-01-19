import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";

import Button from "../index";
describe("Button", () => {
  const CHILDREN = "TEST TEXT";
  test("SHOULD render text", () => {
    render(<Button>{CHILDREN}</Button>);
    expect(screen.getByText(CHILDREN)).toBeInTheDocument();
  });
  test("SHOULD execute onClick", () => {
    const mockOnClicK = jest.fn();
    render(<Button onClick={mockOnClicK}>{CHILDREN}</Button>);
    const button = screen.getByText(CHILDREN);
    fireEvent.click(button);
    expect(mockOnClicK).toHaveBeenCalled();
  });
});
