import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectList from "../index";

describe("SelectList", () => {
  const list = ["item1", "item2", "item3"];
  const callback = jest.fn();

  test("renders all items", () => {
    const { getAllByRole } = render(
      <SelectList list={list} callback={callback} />,
    );
    const items = getAllByRole("option");
    expect(items).toHaveLength(list.length);
  });

  test("calls callback with selected value on change", () => {
    const { getByRole } = render(
      <SelectList list={list} callback={callback} />,
    );
    const select = getByRole("combobox");
    fireEvent.change(select, { target: { value: "item2" } });
    expect(callback).toHaveBeenCalledWith("item2");
  });
});
