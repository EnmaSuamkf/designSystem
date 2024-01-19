import React from "react";
import { render } from "@testing-library/react";
import Show from "../index";

describe("Show component", () => {
  it("renders children when `when` prop is true", () => {
    const { getByText } = render(
      <Show when={true}>
        <div>Test content</div>
      </Show>,
    );

    expect(getByText("Test content")).toBeInTheDocument();
  });

  it("does not render children when `when` prop is false", () => {
    const { queryByText } = render(
      <Show when={false}>
        <div>Test content</div>
      </Show>,
    );

    expect(queryByText("Test content")).not.toBeInTheDocument();
  });
});
