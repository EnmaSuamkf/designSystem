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
});
