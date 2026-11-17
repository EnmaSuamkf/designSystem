import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DateRangeField from "../index";

const INVALID = "La fecha de fin es anterior a la de inicio";

const renderField = (props = {}) => {
  const onChange = jest.fn();
  const utils = render(
    <DateRangeField
      id="vigencia"
      startLabel="Desde"
      endLabel="Hasta"
      startValue=""
      endValue=""
      onChange={onChange}
      invalidRangeMessage={INVALID}
      {...props}
    />,
  );
  return { ...utils, onChange };
};

describe("DateRangeField", () => {
  it("renders two date inputs with labels bound to them and stable ids", () => {
    renderField();
    const start = screen.getByLabelText("Desde");
    const end = screen.getByLabelText("Hasta");
    expect(start).toHaveAttribute("type", "date");
    expect(end).toHaveAttribute("type", "date");
    expect(start).toHaveAttribute("id", "vigencia-start");
    expect(end).toHaveAttribute("id", "vigencia-end");
  });

  it("shows the given values in the inputs", () => {
    renderField({ startValue: "2026-03-01", endValue: "2026-03-10" });
    expect(screen.getByLabelText("Desde")).toHaveValue("2026-03-01");
    expect(screen.getByLabelText("Hasta")).toHaveValue("2026-03-10");
  });

  it("reports the whole range through onChange when the start changes", () => {
    const { onChange } = renderField({
      startValue: "",
      endValue: "2026-03-10",
    });
    fireEvent.change(screen.getByLabelText("Desde"), {
      target: { value: "2026-03-02" },
    });
    expect(onChange).toHaveBeenCalledWith({
      start: "2026-03-02",
      end: "2026-03-10",
    });
  });

  it("reports the whole range through onChange when the end changes", () => {
    const { onChange } = renderField({
      startValue: "2026-03-02",
      endValue: "",
    });
    fireEvent.change(screen.getByLabelText("Hasta"), {
      target: { value: "2026-03-20" },
    });
    expect(onChange).toHaveBeenCalledWith({
      start: "2026-03-02",
      end: "2026-03-20",
    });
  });

  it("shows the invalid range message and marks the end input when end is before start", () => {
    renderField({ startValue: "2026-03-10", endValue: "2026-03-01" });
    const message = screen.getByRole("alert");
    expect(message).toHaveTextContent(INVALID);
    expect(message).toHaveStyle({ color: "rgb(244, 56, 56)" });
    expect(screen.getByLabelText("Hasta")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText("Hasta")).toHaveAccessibleDescription(INVALID);
    expect(screen.getByLabelText("Desde")).not.toHaveAttribute("aria-invalid");
  });

  it("accepts a range where both dates are the same day", () => {
    renderField({ startValue: "2026-03-10", endValue: "2026-03-10" });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Hasta")).not.toHaveAttribute("aria-invalid");
  });

  it("does not validate while one of the dates is empty", () => {
    renderField({ startValue: "2026-03-10", endValue: "" });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Hasta")).not.toHaveAttribute("aria-invalid");
  });

  it("disables both inputs when disabled", () => {
    renderField({ disabled: true });
    expect(screen.getByLabelText("Desde")).toBeDisabled();
    expect(screen.getByLabelText("Hasta")).toBeDisabled();
  });

  it("renders the hint and links it to both inputs", () => {
    renderField({ hint: "Dejar vacío para no limitar la fecha" });
    expect(
      screen.getByText("Dejar vacío para no limitar la fecha"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Desde")).toHaveAccessibleDescription(
      "Dejar vacío para no limitar la fecha",
    );
  });
});
