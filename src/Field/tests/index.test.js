import React from "react";
import { render, screen } from "@testing-library/react";
import Field from "../index";
import Select from "../../Select";

const options = [{ value: "a", label: "Opción A" }];

describe("Field", () => {
  it("renders the label before the control", () => {
    render(
      <Field label="Tipo" id="tipo">
        <Select options={options} value="a" onChange={() => {}} />
      </Field>,
    );
    const label = screen.getByText("Tipo");
    const control = screen.getByRole("combobox");
    expect(
      label.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("links the label to the control with htmlFor/id", () => {
    render(
      <Field label="Tipo" id="tipo">
        <Select options={options} value="a" onChange={() => {}} />
      </Field>,
    );
    expect(screen.getByLabelText("Tipo")).toBe(screen.getByRole("combobox"));
    expect(screen.getByRole("combobox")).toHaveAttribute("id", "tipo");
  });

  it("uses the id of the control when Field has no id", () => {
    render(
      <Field label="Tipo">
        <Select
          id="categoria"
          options={options}
          value="a"
          onChange={() => {}}
        />
      </Field>,
    );
    expect(screen.getByLabelText("Tipo")).toBe(screen.getByRole("combobox"));
  });

  it("puts the label 8px above the control (spacing token)", () => {
    render(
      <Field label="Tipo" id="tipo">
        <Select options={options} value="a" onChange={() => {}} />
      </Field>,
    );
    const s = window.getComputedStyle(screen.getByText("Tipo"));
    expect(s.marginBottom).toBe("8px");
  });

  it("shows the error line when given", () => {
    render(
      <Field label="Tipo" id="tipo" error="Campo obligatorio">
        <Select options={options} value="a" onChange={() => {}} />
      </Field>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Campo obligatorio");
  });
});
