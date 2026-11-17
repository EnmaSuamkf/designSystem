import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import EditableList from "../index";

const items = [
  { id: "p1", name: "Globos" },
  { id: "p2", name: "Serpentinas" },
  { id: "p3", name: "Velas" },
];

const baseProps = {
  getKey: (item) => item.id,
  renderItem: (item, index) => <span>{`${index + 1}. ${item.name}`}</span>,
  onAdd: jest.fn(),
  onRemove: jest.fn(),
  onMove: jest.fn(),
  addLabel: "Agregar",
  removeLabel: "Quitar",
  moveUpLabel: "Subir",
  moveDownLabel: "Bajar",
  emptyLabel: "Todavía no hay elementos",
  maxReachedLabel: "Se alcanzó el máximo",
};

const renderList = (props = {}) =>
  render(<EditableList items={items} {...baseProps} {...props} />);

const rows = () => screen.getAllByRole("listitem");

describe("EditableList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the items in order using renderItem", () => {
    renderList();
    const texts = rows().map((row) => row.textContent);
    expect(texts[0]).toContain("1. Globos");
    expect(texts[1]).toContain("2. Serpentinas");
    expect(texts[2]).toContain("3. Velas");
  });

  it("calls onMove with the row and its target index when moving up or down", () => {
    const onMove = jest.fn();
    renderList({ onMove });
    fireEvent.click(screen.getByRole("button", { name: "Bajar 1" }));
    expect(onMove).toHaveBeenLastCalledWith(0, 1);
    fireEvent.click(screen.getByRole("button", { name: "Subir 2" }));
    expect(onMove).toHaveBeenLastCalledWith(1, 0);
  });

  it("disables move up on the first row and move down on the last row", () => {
    renderList();
    expect(screen.getByRole("button", { name: "Subir 1" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Bajar 3" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Bajar 1" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Subir 3" })).toBeEnabled();
  });

  it("calls onRemove with the index of the row whose remove button was clicked", () => {
    const onRemove = jest.fn();
    renderList({ onRemove });
    fireEvent.click(screen.getByRole("button", { name: "Quitar 2" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("uses native buttons so they can be operated from the keyboard", () => {
    renderList();
    const button = screen.getByRole("button", { name: "Quitar 1" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
  });

  it("shows the add button only when onAdd is given and calls it", () => {
    const onAdd = jest.fn();
    const { unmount } = renderList({ onAdd });
    fireEvent.click(screen.getByRole("button", { name: "Agregar" }));
    expect(onAdd).toHaveBeenCalledTimes(1);
    unmount();

    renderList({ onAdd: undefined });
    expect(
      screen.queryByRole("button", { name: "Agregar" }),
    ).not.toBeInTheDocument();
  });

  it("disables the add button and shows the max message when max is reached", () => {
    const onAdd = jest.fn();
    renderList({ onAdd, max: 3 });
    const add = screen.getByRole("button", { name: "Agregar" });
    expect(add).toBeDisabled();
    fireEvent.click(add);
    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Se alcanzó el máximo",
    );
  });

  it("keeps the add button enabled while below max", () => {
    renderList({ onAdd: jest.fn(), max: 4 });
    expect(screen.getByRole("button", { name: "Agregar" })).toBeEnabled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows the empty label and no rows when there are no items", () => {
    renderList({ items: [] });
    expect(screen.getByText("Todavía no hay elementos")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("still lets the user add the first item from the empty state", () => {
    const onAdd = jest.fn();
    renderList({ items: [], onAdd });
    fireEvent.click(screen.getByRole("button", { name: "Agregar" }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("builds the row aria-labels from the label props and the row number", () => {
    renderList();
    const row = rows()[1];
    expect(
      within(row).getByRole("button", { name: "Subir 2" }),
    ).toBeInTheDocument();
    expect(
      within(row).getByRole("button", { name: "Bajar 2" }),
    ).toBeInTheDocument();
    expect(
      within(row).getByRole("button", { name: "Quitar 2" }),
    ).toBeInTheDocument();
  });

  it("draws the remove button with an icon, not a text glyph", () => {
    renderList();
    const remove = screen.getByRole("button", { name: "Quitar 1" });
    expect(remove.textContent).toBe("");
    expect(remove.querySelector("svg")).not.toBeNull();
  });
});
