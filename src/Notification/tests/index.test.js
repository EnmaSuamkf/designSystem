import React from "react";
import { render } from "@testing-library/react";
import Notification from "../index";

describe("Notification component", () => {
  it("renders title and message", () => {
    const { getByText } = render(
      <Notification
        title="Test Title"
        message="Test Message"
        type="positive"
      />,
    );

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Message")).toBeInTheDocument();
  });

  it("uses readable text color for every type", () => {
    ["positive", "neutral", "primary", "warning"].forEach((type) => {
      const { getByRole, unmount } = render(
        <Notification title="T" message="M" type={type} />,
      );
      const style = window.getComputedStyle(getByRole("status"));
      expect(style.color).not.toBe(style.backgroundColor);
      unmount();
    });
  });
});
