import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Switch from "../index";

describe("Toogle Switch", () => {
  it("renders correctly", () => {
    render(<Switch isOn={false} handleToggle={() => {}} />);
    const switchInput = screen.getByTestId("switch");
    expect(switchInput).toBeInTheDocument();
  });

  it("handles click event", () => {
    const handleToggle = jest.fn();
    render(<Switch isOn={false} handleToggle={handleToggle} />);
    const switchInput = screen.getByTestId("switch");
    fireEvent.click(switchInput);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it("reflects the isOn prop", () => {
    const { rerender } = render(
      <Switch isOn={false} handleToggle={() => {}} />,
    );
    let switchInput = screen.getByTestId("switch");
    expect(switchInput.checked).toBe(false);

    rerender(<Switch isOn={true} handleToggle={() => {}} />);
    switchInput = screen.getByTestId("switch");
    expect(switchInput.checked).toBe(true);
  });
});
