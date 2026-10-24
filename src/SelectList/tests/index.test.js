import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SelectList from "../index";

describe("SelectList", () => {
  const list = [
    { value: "item1", _id: "1" },
    { value: "item2", _id: "2" },
    { value: "item3", _id: "3" },
  ];
  const callback = jest.fn();

  test("renders all items", () => {
    render(<SelectList list={list} callback={callback} />);
    list.forEach((item) => {
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });
  });

  test("calls callback with selected value on change", () => {
    render(<SelectList list={list} callback={callback} />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: JSON.stringify({ value: "item2", _id: "2" }) },
    });
    expect(callback).toHaveBeenCalledWith({ value: "item2", _id: "2" });
  });

  test("uses the shared field look (40px, regular radius)", () => {
    render(<SelectList list={list} callback={callback} />);
    const s = window.getComputedStyle(screen.getByRole("combobox"));
    expect(s.height).toBe("40px");
    expect(s.borderRadius).toBe("5px");
    expect(s.fontSize).toBe("14px");
  });
});

describe("SelectList responsive", () => {
  test("SHOULD be full width with a touch-friendly size only on mobile", () => {
    render(<SelectList list={[{ value: "a", _id: "1" }]} width="50%" />);
    const rules = [...document.styleSheets]
      .flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText))
      .join("\n");
    expect(rules).toContain("@media (max-width: 767px)");
    expect(rules).toContain("min-height: 44px");
  });
});
