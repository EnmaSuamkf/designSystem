import React from "react";
import { render, screen } from "@testing-library/react";
import Frame from "../index";

describe("Frame", () => {
  test("SHOULD render an embedded page with its title and address", () => {
    render(
      <Frame
        src="https://shop.example.com/vista-previa?token=x"
        title="Vista previa"
      />,
    );
    const frame = screen.getByTitle("Vista previa");
    expect(frame.tagName).toBe("IFRAME");
    expect(frame).toHaveAttribute(
      "src",
      "https://shop.example.com/vista-previa?token=x",
    );
    expect(frame).toHaveAttribute("loading", "lazy");
  });

  test("SHOULD take the width and height it is given", () => {
    render(
      <Frame
        src="https://x.example.com"
        title="T"
        width="320px"
        height="600px"
      />,
    );
    expect(screen.getByTitle("T")).toHaveStyle({
      width: "320px",
      height: "600px",
    });
  });

  test("SHOULD use the default size when none is given", () => {
    render(<Frame src="https://x.example.com" title="Default" />);
    expect(screen.getByTitle("Default")).toHaveStyle({
      width: "100%",
      height: "480px",
    });
  });
});
