import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextArea from "../index.js";

describe("TextArea", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<TextArea data-testid="textarea" />);
    const textarea = getByTestId("textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("updates on change", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <TextArea data-testid="textarea" onChange={onChange} />,
    );
    const textarea = getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("uses the shared field look (40px, regular radius, 1px border, 14px)", () => {
    const { getByTestId } = render(<TextArea data-testid="field" />);
    const s = window.getComputedStyle(getByTestId("field"));
    expect(s.minHeight).toBe("40px");
    expect(s.borderRadius).toBe("5px");
    expect(s.borderWidth).toBe("1px");
    expect(s.fontSize).toBe("14px");
    expect(s.boxSizing).toBe("border-box");
    expect(s.fontFamily).toContain("system-ui");
  });
});
