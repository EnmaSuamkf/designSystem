import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingPage } from "../index";

describe("LoadingPage", () => {
  test("AT desktop width SHOULD render the side column + content skeleton", () => {
    render(<LoadingPage />);
    expect(screen.getByTestId("app-loading-desktop")).toBeInTheDocument();
    expect(screen.queryByTestId("app-loading-mobile")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("loading-box")).toHaveLength(2);
  });

  test("AT mobile width SHOULD render a single column skeleton", () => {
    render(<LoadingPage isMobile />);
    expect(screen.getByTestId("app-loading-mobile")).toBeInTheDocument();
    expect(screen.queryByTestId("app-loading-desktop")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("loading-box").length).toBeGreaterThan(2);
  });
});
