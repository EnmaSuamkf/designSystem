import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Tag from "../index";

describe("Tag component", () => {
  test("renders correctly", () => {
    const mockOnClose = jest.fn();
    const tags = [
      { title: "tag1", onClick: mockOnClose },
      { title: "tag2", onClick: mockOnClose },
      { title: "tag3", onClick: mockOnClose },
    ];
    render(<Tag tags={tags} />);
    tags.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getAllByText("tag", { exact: false })).toHaveLength(
        tags.length,
      );
    });
  });
  test("WHEN icon is pass as a prop SHOULD be display IF not SHOULD display x ", () => {
    const mockOnClose = jest.fn();
    const tags = [
      { title: "tag1", onClick: mockOnClose, icon: <>icon</> },
      { title: "tag2", onClick: mockOnClose },
      { title: "tag3", onClick: mockOnClose },
    ];
    render(<Tag tags={tags} />);
    tags.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText("icon")).toBeInTheDocument();
      expect(screen.getAllByText("x")).toHaveLength(2);
    });
  });
  test("WHEN click on icon SHOULD execute ", () => {
    const mockOnClose = jest.fn();
    const tags = [
      { title: "tag1", onClick: mockOnClose, icon: <>icon</> },
      { title: "tag2", onClick: mockOnClose },
      { title: "tag3", onClick: mockOnClose },
    ];
    render(<Tag tags={tags} />);
    const tag = screen.getByText("icon");
    fireEvent.click(tag);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
