import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Tag, { getStatusColors } from "../index";
import { getContrastRatio } from "../../theme/util";

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

  describe("status variant", () => {
    test("renders titles as pills with data-status", () => {
      const tags = [
        { title: "Activo", status: "active" },
        { title: "Inactivo", status: "inactive" },
        { title: "Sin estado" },
      ];
      render(<Tag variant="status" tags={tags} />);
      expect(screen.getByText("Activo")).toHaveAttribute(
        "data-status",
        "active",
      );
      expect(screen.getByText("Inactivo")).toHaveAttribute(
        "data-status",
        "inactive",
      );
      expect(screen.getByText("Sin estado")).toHaveAttribute(
        "data-status",
        "neutral",
      );
      expect(screen.queryByText("x")).not.toBeInTheDocument();
    });

    test("renders icon and calls onClick only when icon is provided", () => {
      const onClick = jest.fn();
      render(
        <Tag
          variant="status"
          tags={[{ title: "A", status: "active", onClick, icon: <>ic</> }]}
        />,
      );
      fireEvent.click(screen.getByText("ic"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test.each(["active", "inactive", "error", "info", "neutral"])(
      "status %s text SHOULD reach 4.5:1 on its tint",
      (status) => {
        const { background, color } = getStatusColors(status);
        expect(getContrastRatio(color, background)).toBeGreaterThanOrEqual(4.5);
      },
    );

    test("default variant keeps rendering the x icon", () => {
      render(<Tag tags={[{ title: "t" }]} />);
      expect(screen.getByText("x")).toBeInTheDocument();
    });
  });
});
