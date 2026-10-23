/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "..";

let handleSearch = jest.fn();
let handleEnter = jest.fn();
let handleLoad = jest.fn();
const PLACEHOLDER = "PLACEHOLDER";
describe("SearchBar component", () => {
  beforeEach(() => {
    handleSearch = jest.fn();
    handleEnter = jest.fn();
    handleLoad = jest.fn();
  });
  test("SHOULD renders SearchBar AND checks input change", () => {
    render(
      <SearchBar
        onSearch={handleSearch}
        onEnter={handleEnter}
        onLoad={handleLoad}
        placeholder={PLACEHOLDER}
      />,
    );
    expect(handleLoad).toHaveBeenCalled();
    const inputElement = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement.value).toBe("test");
  });
  test("WHEN type 'Enter' SHOULD execute onEnter method", () => {
    render(
      <SearchBar
        onSearch={handleSearch}
        onEnter={handleEnter}
        onLoad={handleLoad}
        placeholder={PLACEHOLDER}
      />,
    );

    const inputElement = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(inputElement, { target: { value: "test" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(handleEnter).toHaveBeenCalledWith("test");
  });
  test("WHEN click over the magnifyingGlassColor icon SHOULD execute onSearch method", () => {
    render(
      <SearchBar
        onSearch={handleSearch}
        onEnter={handleEnter}
        onLoad={handleLoad}
        placeholder={PLACEHOLDER}
      />,
    );

    const inputElement = screen.getByTestId("search-icon");
    fireEvent.click(inputElement);
    expect(handleSearch).toHaveBeenCalled();
  });

  test("SHOULD render a non-pill 40px field containing the icon", () => {
    render(<SearchBar placeholder={PLACEHOLDER} />);
    const wrapper = screen.getByPlaceholderText(PLACEHOLDER).closest("div")
      .parentElement.parentElement;
    const s = window.getComputedStyle(wrapper);
    expect(s.height).toBe("40px");
    expect(s.borderRadius).toBe("5px");
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });
});
