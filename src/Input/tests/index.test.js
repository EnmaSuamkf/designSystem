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

  it("uses the shared field look (40px, regular radius, 1px border, 14px)", () => {
    const { getByTestId } = render(<Input data-testid="field" />);
    const s = window.getComputedStyle(getByTestId("field"));
    expect(s.height).toBe("40px");
    expect(s.borderRadius).toBe("5px");
    expect(s.borderWidth).toBe("1px");
    expect(s.fontSize).toBe("14px");
    expect(s.boxSizing).toBe("border-box");
    expect(s.fontFamily).toContain("system-ui");
  });
});
