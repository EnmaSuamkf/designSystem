import { getThemeValue, getProccecedProps, colorWithOpacity } from "../util";

describe("util", () => {
  describe("getThemeValue", () => {
    it("should return the theme value for a given token", () => {
      localStorage.setItem(
        "theme",
        JSON.stringify({ $theme_neutral_color_0: "#ffffff" }),
      );
      expect(getThemeValue("$theme_neutral_color_0")).toBe("#ffffff");
    });

    it("should return the token if the theme value does not exist", () => {
      localStorage.setItem("theme", JSON.stringify({}));
      expect(getThemeValue("$theme_neutral_color_0")).toBe(
        "$theme_neutral_color_0",
      );
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
});
