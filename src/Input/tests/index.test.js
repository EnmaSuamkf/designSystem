import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "../index.js";

describe("Input", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Input data-testid="input" />);
    const input = getByTestId("input");
    expect(input).toBeInTheDocument();
  });

  it("updates on change", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Input data-testid="input" onChange={onChange} />,
    );
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalled();
  });
});
