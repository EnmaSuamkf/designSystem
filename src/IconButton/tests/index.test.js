import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import IconButton from "../index";
import { Hamburger } from "../../Icons";

describe("IconButton", () => {
  test("SHOULD render a button with aria attributes and call onClick", () => {
    const onClick = jest.fn();
    render(
      <IconButton
        aria-label="Abrir menú"
        aria-expanded={false}
        aria-controls="menu"
        onClick={onClick}
        mobileOnly
      >
        <Hamburger />
      </IconButton>,
    );
    const button = screen.getByLabelText("Abrir menú");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "menu");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("Hamburger SHOULD be hidden from assistive technology", () => {
    const { container } = render(<Hamburger />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
