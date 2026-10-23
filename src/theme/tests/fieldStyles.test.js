import { getFieldBaseStyles } from "../fieldStyles";

describe("getFieldBaseStyles", () => {
  afterEach(() => localStorage.clear());

  it("uses the spacing tokens for the default single-line padding", () => {
    localStorage.clear();
    expect(getFieldBaseStyles()).toContain("padding: 0 12px;");
  });

  it("follows the saved spacing token", () => {
    localStorage.setItem(
      "theme",
      JSON.stringify({ $theme_spacing_small: "20px" }),
    );
    expect(getFieldBaseStyles()).toContain("padding: 0 20px;");
  });

  it("uses both tokens for the multiline padding", () => {
    localStorage.clear();
    expect(getFieldBaseStyles({ multiline: true })).toContain(
      "padding: 8px 12px;",
    );
  });
});
