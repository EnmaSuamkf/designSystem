import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Breadcrumb from "..";

describe("Breadcrumb", () => {
  test("should render correctly", () => {
    const separator = ">";
    const items = [
      {
        name: "Home",
        onClick: jest.fn(),
      },
      {
        name: "Category",
        onClick: jest.fn(),
      },
      {
        name: "Other",
        onClick: jest.fn(),
      },
    ];
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getAllByText(separator)).toHaveLength(2);
  });

  test("should call onClick when click on item", () => {
    const items = [
      {
        name: "Home",
        onClick: jest.fn(),
      },
      {
        name: "Category",
        onClick: jest.fn(),
      },
    ];
    render(<Breadcrumb items={items} />);
    fireEvent.click(screen.getByText("Home"));
    expect(items[0].onClick).toHaveBeenCalled();
  });
});
