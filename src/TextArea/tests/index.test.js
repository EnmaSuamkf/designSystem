import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextArea from "../index.js";

describe("TextArea", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<TextArea data-testid="textarea" />);
    const textarea = getByTestId("textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("updates on change", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <TextArea data-testid="textarea" onChange={onChange} />,
    );
    const textarea = getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalled();
  });
});
