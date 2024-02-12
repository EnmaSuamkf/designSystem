import React from "react";
import { render, screen } from "@testing-library/react";
import BackgroundImage from "../index";

describe("BackgroundImage component", () => {
  test("renders correctly", () => {
    render(<BackgroundImage urlImage="testImage.jpg" />);
    const boxElement = screen.getByTestId("background-box");
    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveStyle(`background-image: url(testImage.jpg)`);
  });

  test("renders children when passed in", () => {
    render(
      <BackgroundImage urlImage="testImage.jpg">
        <div>Test Child</div>
      </BackgroundImage>,
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test("has correct default styles", () => {
    render(<BackgroundImage urlImage="testImage.jpg" />);
    const boxElement = screen.getByTestId("background-box");
    expect(boxElement).toHaveStyle("width: 100%");
    expect(boxElement).toHaveStyle("height: 100%");
    expect(boxElement).toHaveStyle("background-size: cover");
    expect(boxElement).toHaveStyle("background-position: center");
    expect(boxElement).toHaveStyle("background-repeat: no-repeat");
  });

  test("applies custom styles when passed in", () => {
    render(
      <BackgroundImage
        urlImage="testImage.jpg"
        width="50%"
        height="50%"
        backgroundSize="contain"
        backgroundPosition="top"
        backgroundRepeat="repeat"
      />,
    );
    const boxElement = screen.getByTestId("background-box");
    expect(boxElement).toHaveStyle("width: 50%");
    expect(boxElement).toHaveStyle("height: 50%");
    expect(boxElement).toHaveStyle("background-size: contain");
    expect(boxElement).toHaveStyle("background-position: top");
    expect(boxElement).toHaveStyle("background-repeat: repeat");
  });
});
