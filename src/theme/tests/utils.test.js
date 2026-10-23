import {
  getThemeValue,
  getProccecedProps,
  colorWithOpacity,
  getContrastRatio,
  getReadableTextColor,
  ensureContrast,
  shadeColor,
  tintColor,
  blendColor,
} from "../util";
import { theme as defaultTheme } from "../theme";

describe("util", () => {
  describe("getThemeValue", () => {
    it("should return the theme value for a given token", () => {
      localStorage.setItem(
        "theme",
        JSON.stringify({ $theme_neutral_color_0: "#ffffff" }),
      );
      expect(getThemeValue("$theme_neutral_color_0")).toBe("#ffffff");
    });

    it("should fall back to the static default if the saved theme lacks the token", () => {
      localStorage.setItem("theme", JSON.stringify({}));
      expect(getThemeValue("$theme_neutral_color_0")).toBe(
        defaultTheme.$theme_neutral_color_0,
      );
    });

    describe("fallback to static defaults", () => {
      afterEach(() => localStorage.clear());

      it("returns a hex when localStorage.theme is empty", () => {
        localStorage.clear();
        expect(getThemeValue("$theme_primary_color_100")).toMatch(
          /^#[0-9a-f]{6}$/i,
        );
        localStorage.setItem("theme", "");
        expect(getThemeValue("$theme_primary_color_100")).toBe("#FF0080");
      });

      it("falls back when localStorage.theme is invalid JSON", () => {
        localStorage.setItem("theme", "{not json");
        expect(getThemeValue("$theme_positive_color")).toBe("#6bcf00");
      });

      it("falls back when localStorage.theme is not an object", () => {
        localStorage.setItem("theme", "null");
        expect(getThemeValue("$theme_radius_regular")).toBe("5px");
      });

      it("falls back for a token missing from the saved theme", () => {
        localStorage.setItem(
          "theme",
          JSON.stringify({ $theme_neutral_color_0: "#fafafa" }),
        );
        expect(getThemeValue("$theme_radius_big")).toBe("10px");
      });

      it("prefers the saved value over the default", () => {
        localStorage.setItem(
          "theme",
          JSON.stringify({ $theme_primary_color_100: "#BE1A6F" }),
        );
        expect(getThemeValue("$theme_primary_color_100")).toBe("#BE1A6F");
      });

      it("returns unknown tokens and plain css values untouched", () => {
        localStorage.clear();
        expect(getThemeValue("$theme_does_not_exist")).toBe(
          "$theme_does_not_exist",
        );
        expect(getThemeValue("100%")).toBe("100%");
        expect(getThemeValue(undefined)).toBeUndefined();
      });

      it("static defaults match the current DB palette", () => {
        expect(defaultTheme.$theme_neutral_color_30).toBe("#acacac");
        expect(defaultTheme.$theme_positive_color).toBe("#6bcf00");
      });
    });
  });

  describe("getProccecedProps", () => {
    it("should return the processed props", () => {
      const props = { color: "$theme_neutral_color_0" };
      localStorage.setItem(
        "theme",
        JSON.stringify({ $theme_neutral_color_0: "#ffffff" }),
      );
      expect(getProccecedProps(props)).toBe(" color: #ffffff;");
    });
  });

  describe("colorWithOpacity", () => {
    it("should return the color with the given opacity", () => {
      expect(colorWithOpacity("#ffffff", 0.5)).toBe("rgba(255, 255, 255, 0.5)");
    });
  });

  describe("color helpers", () => {
    it("computes contrast ratios", () => {
      expect(getContrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 0);
      expect(getContrastRatio("nope", "#FFFFFF")).toBeNull();
    });

    it("picks readable text, preferring the preferred color", () => {
      expect(getReadableTextColor("#BE1A6F", "#FFFFFF", "#000000")).toBe(
        "#FFFFFF",
      );
      expect(getReadableTextColor("#6bcf00", "#FFFFFF", "#000000")).toBe(
        "#000000",
      );
      expect(getReadableTextColor("var(--x)", "#FFFFFF", "#000000")).toBe(
        "#FFFFFF",
      );
    });

    it("darkens a color until it is readable", () => {
      expect(
        getContrastRatio(ensureContrast("#f43838", "#FFFFFF"), "#FFFFFF"),
      ).toBeGreaterThanOrEqual(4.5);
      expect(ensureContrast("#000000", "#FFFFFF")).toBe("#000000");
    });

    it("shades, tints and blends", () => {
      expect(shadeColor("#ffffff", 0.5)).toBe("#808080");
      expect(shadeColor("red", 0.5)).toBe("red");
      expect(tintColor("#000000", 0.1)).toBe("rgba(0, 0, 0, 0.1)");
      expect(tintColor("red", 0.1)).toBe("red");
      expect(blendColor("#000000", "#ffffff", 0.5)).toBe("#808080");
    });
  });
});
