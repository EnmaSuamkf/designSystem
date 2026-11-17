import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ImageUploadField from "../index";

const baseProps = {
  id: "portada",
  label: "Imagen",
  chooseLabel: "Elegir imagen",
  removeLabel: "Quitar imagen",
  emptyLabel: "Sin imagen",
  onSelectFile: jest.fn(),
  onRemove: jest.fn(),
};

const getFileInput = (container) =>
  container.querySelector('input[type="file"]');

describe("ImageUploadField", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("binds the label to the choose button", () => {
    render(<ImageUploadField {...baseProps} />);
    const button = screen.getByLabelText("Imagen");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveTextContent("Elegir imagen");
  });

  it("shows the empty label and no remove button when there is no image", () => {
    render(<ImageUploadField {...baseProps} />);
    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Quitar imagen" }),
    ).not.toBeInTheDocument();
  });

  it("hides the empty label and shows the remove button when there is an image", () => {
    render(
      <ImageUploadField
        {...baseProps}
        previewUrl="https://example.com/a.png"
      />,
    );
    expect(screen.queryByText("Sin imagen")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Quitar imagen" }),
    ).toBeInTheDocument();
  });

  it("calls onRemove when the remove button is clicked", () => {
    const onRemove = jest.fn();
    render(
      <ImageUploadField
        {...baseProps}
        onRemove={onRemove}
        previewUrl="https://example.com/a.png"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Quitar imagen" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("opens the hidden file input when the choose button is clicked", () => {
    const { container } = render(<ImageUploadField {...baseProps} />);
    const input = getFileInput(container);
    const clickSpy = jest.spyOn(input, "click");
    fireEvent.click(screen.getByLabelText("Imagen"));
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("accepts images by default and allows overriding accept", () => {
    const { container, unmount } = render(<ImageUploadField {...baseProps} />);
    expect(getFileInput(container)).toHaveAttribute("accept", "image/*");
    unmount();

    const custom = render(
      <ImageUploadField {...baseProps} accept="image/png,image/jpeg" />,
    );
    expect(getFileInput(custom.container)).toHaveAttribute(
      "accept",
      "image/png,image/jpeg",
    );
  });

  it("calls onSelectFile with the chosen file", () => {
    const onSelectFile = jest.fn();
    const { container } = render(
      <ImageUploadField {...baseProps} onSelectFile={onSelectFile} />,
    );
    const file = new File(["bytes"], "portada.png", { type: "image/png" });
    fireEvent.change(getFileInput(container), {
      target: { files: [file] },
    });
    expect(onSelectFile).toHaveBeenCalledTimes(1);
    expect(onSelectFile).toHaveBeenCalledWith(file);
  });

  it("does not call onSelectFile when no file was chosen", () => {
    const onSelectFile = jest.fn();
    const { container } = render(
      <ImageUploadField {...baseProps} onSelectFile={onSelectFile} />,
    );
    fireEvent.change(getFileInput(container), { target: { files: [] } });
    expect(onSelectFile).not.toHaveBeenCalled();
  });

  it("shows a loading box instead of the empty label while loading", () => {
    render(<ImageUploadField {...baseProps} loading />);
    expect(screen.getByTestId("loading-box")).toBeInTheDocument();
    expect(screen.queryByText("Sin imagen")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Imagen")).toBeDisabled();
  });

  it("disables the remove button while loading", () => {
    render(
      <ImageUploadField
        {...baseProps}
        loading
        previewUrl="https://example.com/a.png"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Quitar imagen" }),
    ).toBeDisabled();
  });

  it("shows the hint and the error, linked to the choose button", () => {
    render(
      <ImageUploadField
        {...baseProps}
        hint="PNG o JPG, máximo 2 MB"
        error="El archivo es demasiado grande"
      />,
    );
    expect(screen.getByText("PNG o JPG, máximo 2 MB")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "El archivo es demasiado grande",
    );
    const button = screen.getByLabelText("Imagen");
    expect(button).toHaveAccessibleDescription(
      "PNG o JPG, máximo 2 MB El archivo es demasiado grande",
    );
  });
});
