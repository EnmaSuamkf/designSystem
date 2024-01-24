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
});
