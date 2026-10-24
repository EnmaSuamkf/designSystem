import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Drawer from "../index";

const renderDrawer = (props) =>
  render(
    <Drawer id="menu" ariaLabel="Menú principal" {...props}>
      <a href="/one">one</a>
      <a href="/two">two</a>
    </Drawer>,
  );

describe("Drawer", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  test("SHOULD be closed by default and have no backdrop", () => {
    renderDrawer();
    const nav = screen.getByLabelText("Menú principal");
    expect(nav).toHaveAttribute("id", "menu");
    expect(nav).toHaveAttribute("data-open", "false");
    expect(screen.queryByTestId("drawer-backdrop")).not.toBeInTheDocument();
  });

  test("WHEN open SHOULD show the backdrop, focus the first link and lock the scroll", () => {
    renderDrawer({ open: true });
    expect(screen.getByLabelText("Menú principal")).toHaveAttribute(
      "data-open",
      "true",
    );
    expect(screen.getByTestId("drawer-backdrop")).toBeInTheDocument();
    expect(screen.getByText("one")).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  test("SHOULD restore the page scroll when it closes", () => {
    const { rerender } = renderDrawer({ open: true });
    rerender(
      <Drawer id="menu" ariaLabel="Menú principal" open={false}>
        <a href="/one">one</a>
      </Drawer>,
    );
    expect(document.body.style.overflow).toBe("");
  });

  test("WHEN the backdrop is clicked SHOULD call onClose", () => {
    const onClose = jest.fn();
    renderDrawer({ open: true, onClose });
    fireEvent.click(screen.getByTestId("drawer-backdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("WHEN Escape is pressed while open SHOULD call onClose", () => {
    const onClose = jest.fn();
    renderDrawer({ open: true, onClose });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("WHEN closed AND Escape is pressed SHOULD NOT call onClose", () => {
    const onClose = jest.fn();
    renderDrawer({ open: false, onClose });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});
