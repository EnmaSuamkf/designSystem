import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Select from "../index";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
];

describe("Select", () => {
  it("renders the theme border (1px, neutral 50)", () => {
    render(
      <Select
        data-testid="select"
        options={options}
        value="a"
        onChange={() => {}}
      />,
    );
    const s = window.getComputedStyle(screen.getByTestId("select"));
    expect(s.borderWidth).toBe("1px");
    expect(s.borderColor).toBe("#c9c9c9");
    expect(s.borderRadius).toBe("5px");
  });

  it("calls onChange with the new value", () => {
    const onChange = jest.fn();
    render(<Select options={options} value="a" onChange={onChange} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "b" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("renders the placeholder as a disabled empty option", () => {
    render(
      <Select
        options={options}
        value=""
        placeholder="Choose an option"
        onChange={() => {}}
      />,
    );
    const placeholder = screen.getByRole("option", {
      name: "Choose an option",
    });
    expect(placeholder).toBeDisabled();
    expect(placeholder).toHaveValue("");
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("is disabled when disabled is set", () => {
    render(<Select options={options} value="a" disabled onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
