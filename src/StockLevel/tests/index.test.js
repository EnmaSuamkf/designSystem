import React from "react";
import { render, screen } from "@testing-library/react";

import StockLevel from "../index";

describe("StockLevel", () => {
  test("shows ok when reponer is zero", () => {
    render(<StockLevel reponer={0} />);
    expect(screen.getByText("ok")).toBeInTheDocument();
  });

  test("shows replenish label when reponer is greater than zero", () => {
    render(<StockLevel reponer={4} />);
    expect(screen.getByText("Reponer 4")).toBeInTheDocument();
  });

  test("allows custom replenish label", () => {
    render(<StockLevel reponer={2} replenishLabel="reponer" />);
    expect(screen.getByText("reponer")).toBeInTheDocument();
  });
});
