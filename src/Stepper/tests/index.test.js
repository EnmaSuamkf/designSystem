import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Stepper from "../index";

const renderStepper = (props) => render(<Stepper {...props} />);

describe("Stepper", () => {
  test("increases and decreases value with buttons", () => {
    const onChange = jest.fn();
    renderStepper({ value: 2, onChange, min: 0, max: 5, step: 1 });

    fireEvent.click(screen.getByText("+"));
    expect(onChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText("−"));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  test("respects min and max boundaries", () => {
    const onChange = jest.fn();
    renderStepper({ value: 0, onChange, min: 0, max: 1 });

    expect(screen.getByText("−")).toBeDisabled();
    fireEvent.click(screen.getByText("+"));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  test("updates value when typing in the input", () => {
    const onChange = jest.fn();
    renderStepper({ value: 3, onChange, min: 0, max: 10 });

    fireEvent.change(screen.getByTestId("stepper-input"), {
      target: { value: "7" },
    });
    expect(onChange).toHaveBeenCalledWith(7);
  });
});
