import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ToneSelect, { DEFAULT_TONES, TONE_TOKENS } from "../index";
import { getThemeValue } from "../../theme/util";

const OPTIONS = [
  { value: "primary", label: "Principal" },
  { value: "secondary", label: "Secundario" },
  { value: "dark", label: "Oscuro" },
  { value: "light", label: "Claro" },
];

const renderTone = (props = {}) => {
  const onChange = jest.fn();
  const utils = render(
    <ToneSelect
      id="tono"
      label="Color del recuadro"
      value="primary"
      onChange={onChange}
      options={OPTIONS}
      {...props}
    />,
  );
  return { ...utils, onChange };
};

const option = (name) => screen.getByRole("radio", { name });

describe("ToneSelect", () => {
  it("renders a radio group labelled by the label prop", () => {
    renderTone();
    const group = screen.getByRole("radiogroup", {
      name: "Color del recuadro",
    });
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
  });

  it("marks only the selected tone with aria-checked", () => {
    renderTone({ value: "dark" });
    expect(option("Oscuro")).toHaveAttribute("aria-checked", "true");
    expect(option("Principal")).toHaveAttribute("aria-checked", "false");
    expect(option("Claro")).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange with the tone value when a swatch is clicked", () => {
    const { onChange } = renderTone();
    fireEvent.click(option("Claro"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("light");
  });

  it("moves the selection with the arrow keys and wraps around", () => {
    const { onChange } = renderTone({ value: "light" });
    fireEvent.keyDown(option("Claro"), { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith("primary");
    expect(option("Principal")).toHaveFocus();

    fireEvent.keyDown(option("Principal"), { key: "ArrowLeft" });
    expect(onChange).toHaveBeenLastCalledWith("light");
    expect(option("Claro")).toHaveFocus();
  });

  it("moves with ArrowDown and ArrowUp as well", () => {
    const { onChange } = renderTone({ value: "primary" });
    fireEvent.keyDown(option("Principal"), { key: "ArrowDown" });
    expect(onChange).toHaveBeenLastCalledWith("secondary");
    fireEvent.keyDown(option("Secundario"), { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith("primary");
  });

  it("jumps to the first and last tone with Home and End", () => {
    const { onChange } = renderTone({ value: "secondary" });
    fireEvent.keyDown(option("Secundario"), { key: "End" });
    expect(onChange).toHaveBeenLastCalledWith("light");
    fireEvent.keyDown(option("Claro"), { key: "Home" });
    expect(onChange).toHaveBeenLastCalledWith("primary");
  });

  it("uses roving tabindex: only the selected tone is in the tab order", () => {
    renderTone({ value: "dark" });
    expect(option("Oscuro")).toHaveAttribute("tabindex", "0");
    expect(option("Principal")).toHaveAttribute("tabindex", "-1");
    expect(option("Secundario")).toHaveAttribute("tabindex", "-1");
    expect(option("Claro")).toHaveAttribute("tabindex", "-1");
  });

  it("makes the first tone tabbable when nothing is selected", () => {
    renderTone({ value: "" });
    expect(option("Principal")).toHaveAttribute("tabindex", "0");
    expect(option("Oscuro")).toHaveAttribute("tabindex", "-1");
  });

  it("colors each swatch only from its theme token", () => {
    renderTone();
    const swatches = screen.getAllByTestId("tone-swatch");
    expect(swatches[0]).toHaveStyle({
      backgroundColor: getThemeValue("$theme_primary_color_70"),
    });
    expect(swatches[2]).toHaveStyle({
      backgroundColor: getThemeValue("$theme_neutral_color_90"),
    });
    expect(swatches[3]).toHaveStyle({
      backgroundColor: getThemeValue("$theme_neutral_color_0"),
    });
  });

  it("disables every option when disabled", () => {
    renderTone({ disabled: true });
    screen.getAllByRole("radio").forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it("renders exactly the options it is given, with the labels it is given", () => {
    renderTone({
      value: "dark",
      options: [
        { value: "dark", label: "Negro" },
        { value: "light", label: "Blanco" },
      ],
    });
    expect(screen.getAllByRole("radio").map((r) => r.textContent)).toEqual([
      "Negro",
      "Blanco",
    ]);
    expect(option("Negro")).toHaveAttribute("aria-checked", "true");
  });

  it("renders no hard-coded label text: every visible label comes from options", () => {
    renderTone({
      options: [{ value: "primary", label: "Principal" }],
      value: "primary",
    });
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(1);
    expect(radios[0]).toHaveTextContent("Principal");
    DEFAULT_TONES.filter((tone) => tone !== "primary").forEach((tone) => {
      expect(screen.queryByText(tone)).not.toBeInTheDocument();
    });
  });
});

describe("ToneSelect exports", () => {
  it("exports the default tones in order", () => {
    expect(DEFAULT_TONES).toEqual(["primary", "secondary", "dark", "light"]);
  });

  it("maps every tone to a theme token and nothing else", () => {
    expect(TONE_TOKENS).toEqual({
      primary: "$theme_primary_color_70",
      secondary: "$theme_secondary_color_70",
      dark: "$theme_neutral_color_90",
      light: "$theme_neutral_color_0",
    });
    Object.values(TONE_TOKENS).forEach((token) => {
      expect(token.startsWith("$theme_")).toBe(true);
    });
  });
});
