import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PaginationBar from "../index";

describe("PaginationBar", () => {
  const props = {
    pageLength: 3,
    limit: 10,
    currentPage: 1,
    pageLabel: "Page",
    pageSizeLabel: "Page size",
    firstCTA: "first",
    lastCTA: "last",
  };
  let onChangePage;
  beforeEach(() => {
    onChangePage = jest.fn();
  });

  it("SHOULD render the current page and the total pages", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    expect(screen.getByLabelText("Page")).toHaveValue("1");
    expect(screen.getByText("- 3")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("last")).toBeInTheDocument();
  });

  it("SHOULD show the page given by currentPage, not an internal page", () => {
    const { rerender } = render(
      <PaginationBar {...props} currentPage={2} onChangePage={onChangePage} />,
    );
    expect(screen.getByLabelText("Page")).toHaveValue("2");

    rerender(
      <PaginationBar {...props} currentPage={3} onChangePage={onChangePage} />,
    );
    expect(screen.getByLabelText("Page")).toHaveValue("3");
    expect(onChangePage).not.toHaveBeenCalled();
  });

  it("SHOULD call onChangePage with the next and previous page", () => {
    render(
      <PaginationBar {...props} currentPage={2} onChangePage={onChangePage} />,
    );
    fireEvent.click(screen.getByText(">"));
    expect(onChangePage).toHaveBeenLastCalledWith(3, 10);
    fireEvent.click(screen.getByText("<"));
    expect(onChangePage).toHaveBeenLastCalledWith(1, 10);
  });

  it("SHOULD call onChangePage with page 1 when click on first and page 3 when click on last", () => {
    render(
      <PaginationBar {...props} currentPage={2} onChangePage={onChangePage} />,
    );
    fireEvent.click(screen.getByText("last"));
    expect(onChangePage).toHaveBeenLastCalledWith(3, 10);
    fireEvent.click(screen.getByText("first"));
    expect(onChangePage).toHaveBeenLastCalledWith(1, 10);
  });

  it("SHOULD disable first and previous on page 1 and not call onChangePage", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    expect(screen.getByText("first")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText("<")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText(">")).toHaveAttribute("aria-disabled", "false");
    fireEvent.click(screen.getByText("first"));
    fireEvent.click(screen.getByText("<"));
    expect(onChangePage).not.toHaveBeenCalled();
  });

  it("SHOULD disable next and last on the last page and not call onChangePage", () => {
    render(
      <PaginationBar {...props} currentPage={3} onChangePage={onChangePage} />,
    );
    expect(screen.getByText("last")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText(">")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText("<")).toHaveAttribute("aria-disabled", "false");
    fireEvent.click(screen.getByText("last"));
    fireEvent.click(screen.getByText(">"));
    expect(onChangePage).not.toHaveBeenCalled();
  });

  it("SHOULD call onChangePage when a valid page is typed and Enter is pressed", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    const pageInput = screen.getByLabelText("Page");
    fireEvent.change(pageInput, { target: { value: "3" } });
    fireEvent.keyDown(pageInput, { key: "Enter" });
    expect(onChangePage).toHaveBeenCalledWith(3, 10);
  });

  it("SHOULD call onChangePage when a valid page is typed and the input loses focus", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    const pageInput = screen.getByLabelText("Page");
    fireEvent.change(pageInput, { target: { value: "2" } });
    fireEvent.blur(pageInput);
    expect(onChangePage).toHaveBeenCalledWith(2, 10);
  });

  it.each([
    ["0", "page below 1"],
    ["4", "page above the last page"],
    ["2.5", "page that is not a whole number"],
    ["", "empty page"],
  ])(
    "SHOULD ignore an invalid typed page (%s, %s) and reset the input to the current page",
    (value) => {
      render(<PaginationBar {...props} onChangePage={onChangePage} />);
      const pageInput = screen.getByLabelText("Page");
      fireEvent.change(pageInput, { target: { value } });
      fireEvent.keyDown(pageInput, { key: "Enter" });
      expect(onChangePage).not.toHaveBeenCalled();
      expect(pageInput).toHaveValue("1");
    },
  );

  it("SHOULD not call onChangePage when the typed page is the current page", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    const pageInput = screen.getByLabelText("Page");
    fireEvent.change(pageInput, { target: { value: "1" } });
    fireEvent.blur(pageInput);
    expect(onChangePage).not.toHaveBeenCalled();
  });

  it("SHOULD not react to other keys in the typed page input", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    const pageInput = screen.getByLabelText("Page");
    fireEvent.change(pageInput, { target: { value: "2" } });
    fireEvent.keyDown(pageInput, { key: "a" });
    expect(onChangePage).not.toHaveBeenCalled();
  });

  it("SHOULD offer the page sizes 10, 20 and 50 by default", () => {
    render(<PaginationBar {...props} limit={20} onChangePage={onChangePage} />);
    const sizeSelect = screen.getByLabelText("Page size");
    expect(sizeSelect).toHaveValue("20");
    const values = Array.from(sizeSelect.options).map((option) => option.value);
    expect(values).toEqual(["10", "20", "50"]);
  });

  it("SHOULD call onChangePage with page 1 and the new size when the page size changes", () => {
    render(
      <PaginationBar {...props} currentPage={3} onChangePage={onChangePage} />,
    );
    fireEvent.change(screen.getByLabelText("Page size"), {
      target: { value: "50" },
    });
    expect(onChangePage).toHaveBeenCalledWith(1, 50);
  });

  it("SHOULD not call onChangePage when the selected page size is the current one", () => {
    render(<PaginationBar {...props} onChangePage={onChangePage} />);
    fireEvent.change(screen.getByLabelText("Page size"), {
      target: { value: "10" },
    });
    expect(onChangePage).not.toHaveBeenCalled();
  });

  it("SHOULD keep the current limit in the page size options when it is not in the list", () => {
    render(<PaginationBar {...props} limit={25} onChangePage={onChangePage} />);
    const values = Array.from(screen.getByLabelText("Page size").options).map(
      (option) => option.value,
    );
    expect(values).toEqual(["10", "25", "20", "50"].sort((a, b) => a - b));
  });

  it("SHOULD hide the page size selector when pageSizeOptions is empty", () => {
    render(
      <PaginationBar
        {...props}
        pageSizeOptions={[]}
        onChangePage={onChangePage}
      />,
    );
    expect(screen.queryByLabelText("Page size")).not.toBeInTheDocument();
  });

  it("SHOULD show the total text when total and totalText are given", () => {
    render(
      <PaginationBar
        {...props}
        total={42}
        totalText="Products"
        onChangePage={onChangePage}
      />,
    );
    expect(screen.getByText("Products 42")).toBeInTheDocument();
  });
});
