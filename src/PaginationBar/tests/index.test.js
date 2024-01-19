import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PaginationBar from "../index";

describe("PaginationBar", () => {
  const props = {
    pageLength: 3,
    limit: 10,
  };
  let onChangePage;
  beforeEach(() => {
    onChangePage = jest.fn();
  });

  it("SHOULD render correctly", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    expect(screen.getByText("1 - 3")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
  });
  it("SHOULD call onChangePage with page 2 when click on next page", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    fireEvent.click(screen.getByText(">"));
    expect(onChangePage).toHaveBeenCalledWith(2, 10);
    fireEvent.click(screen.getByText(">"));
    fireEvent.click(screen.getByText("<"));
    expect(onChangePage).toHaveBeenCalledWith(2, 10);
    fireEvent.click(screen.getByText("<"));
    expect(onChangePage).toHaveBeenCalledWith(1, 10);
  });
  it("SHOULD not call onChangePage when click on previous page and page is 1", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    fireEvent.click(screen.getByText("<"));
    expect(onChangePage).not.toHaveBeenCalled();
  });
  it("SHOULD not call onChangePage when click on next page and page is last", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    fireEvent.click(screen.getByText(">"));
    fireEvent.click(screen.getByText(">"));
    fireEvent.click(screen.getByText(">"));
    fireEvent.click(screen.getByText(">"));
    fireEvent.click(screen.getByText(">"));
    fireEvent.click(screen.getByText(">"));
    expect(onChangePage).toHaveBeenCalledTimes(2);
  });
});
