import React, { useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import DesplegableBox from "../index";

describe("DesplegableBox", () => {
  test("SHOULD dislpay children WHEN displayStatus is true", () => {
    render(
      <DesplegableBox displayStatus={true}>
        <div>children</div>
      </DesplegableBox>,
    );

    expect(screen.getByText("children")).toBeInTheDocument();
  });

  test("SHOULD NOT dislpay children WHEN displayStatus is false", () => {
    render(
      <DesplegableBox displayStatus={false}>
        <div>children</div>
      </DesplegableBox>,
    );

    expect(screen.queryByText("children")).not.toBeInTheDocument();
  });

  test("SHOULD call callbackOnDisplay WHEN displayStatus is true", () => {
    const callbackOnDisplay = jest.fn();
    render(
      <DesplegableBox
        displayStatus={true}
        callbackOnDisplay={callbackOnDisplay}
      >
        <div>children</div>
      </DesplegableBox>,
    );

    expect(callbackOnDisplay).toHaveBeenCalled();
  });
  test("SHOULD display or note depend status variable", () => {
    const callbackOnDisplay = jest.fn();
    const ParentComponent = () => {
      const [status, setStatus] = useState(false);
      return (
        <div>
          <button onClick={() => setStatus(!status)}>Change status</button>
          <DesplegableBox
            displayStatus={status}
            callbackOnDisplay={callbackOnDisplay}
          >
            <div>children</div>
          </DesplegableBox>
        </div>
      );
    };
    render(<ParentComponent />);
    expect(screen.queryByText("children")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Change status"));
    expect(screen.getByText("children")).toBeInTheDocument();
    expect(callbackOnDisplay).toHaveBeenCalled();
  });
});
