import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";

import Button from "../index";
import { getContrastRatio } from "../../theme/util";
describe("Button", () => {
  const CHILDREN = "TEST TEXT";
  test("SHOULD render text", () => {
    render(<Button>{CHILDREN}</Button>);
    expect(screen.getByText(CHILDREN)).toBeInTheDocument();
  });
  test("SHOULD execute onClick", () => {
    const mockOnClicK = jest.fn();
    render(<Button onClick={mockOnClicK}>{CHILDREN}</Button>);
    const button = screen.getByText(CHILDREN);
    fireEvent.click(button);
    expect(mockOnClicK).toHaveBeenCalled();
  });

  describe("redesign", () => {
    const VARIANTS = [
      "primary",
      "secondary",
      "positive",
      "negative",
      "neutral",
    ];
    const style = (el) => window.getComputedStyle(el);

    test("SHOULD apply base metrics", () => {
      render(<Button>{CHILDREN}</Button>);
      const s = style(screen.getByText(CHILDREN));
      expect(s.minHeight).toBe("36px");
      expect(s.padding).toBe("8px 16px");
      expect(s.fontSize).toBe("14px");
      expect(s.fontWeight).toBe("500");
      expect(s.cursor).toBe("pointer");
      expect(s.borderRadius).toBe("5px");
    });

    test.each(VARIANTS)(
      "variant %s SHOULD never have text equal to its background",
      (variant) => {
        render(<Button theme={variant}>{CHILDREN}</Button>);
        const s = style(screen.getByText(CHILDREN));
        expect(s.color).not.toBe(s.backgroundColor);
      },
    );

    // jsdom applies :hover rules to getComputedStyle, so the resting and
    // hover declarations are read from the injected stylesheet instead.
    const rule = (el, suffix = "") => {
      const cls = Array.from(el.classList);
      const css = Array.from(document.querySelectorAll("style"))
        .map((n) => n.textContent)
        .join("");
      return cls
        .map((c) => {
          const m = css.match(
            new RegExp(
              `\\.${c}${suffix.replace(/[()]/g, "\\$&")}\\{([^}]*)\\}`,
            ),
          );
          return m ? m[1] : "";
        })
        .join("");
    };
    const decl = (body, prop) => {
      const m = body.match(new RegExp(`(?:^|;)${prop}:([^;]*)`));
      return m ? m[1].trim() : null;
    };

    test("positive SHOULD use readable text on the filled background", () => {
      render(<Button theme="positive">{CHILDREN}</Button>);
      const el = screen.getByText(CHILDREN);
      const rest = rule(el);
      const hover = rule(el, ":hover:not(:disabled)");
      expect(decl(rest, "background-color")).toBe("#6bcf00");
      expect(decl(rest, "color")).toBe("#000000");
      [rest, hover].forEach((body) => {
        expect(
          getContrastRatio(decl(body, "background-color"), decl(body, "color")),
        ).toBeGreaterThanOrEqual(4.5);
      });
    });

    test.each(["primary", "positive", "negative"])(
      "%s SHOULD keep text different from background in rest and hover",
      (variant) => {
        render(<Button theme={variant}>{CHILDREN}</Button>);
        const el = screen.getByText(CHILDREN);
        [rule(el), rule(el, ":hover:not(:disabled)")].forEach((body) => {
          expect(decl(body, "color")).not.toBe(decl(body, "background-color"));
          expect(
            getContrastRatio(
              decl(body, "background-color"),
              decl(body, "color"),
            ),
          ).toBeGreaterThanOrEqual(4.5);
        });
      },
    );

    test("negative SHOULD be outlined with a readable colored text and fill on hover", () => {
      render(<Button theme="negative">{CHILDREN}</Button>);
      const el = screen.getByText(CHILDREN);
      const rest = rule(el);
      const hover = rule(el, ":hover:not(:disabled)");
      expect(decl(rest, "background-color")).toBe("#FFFFFF");
      expect(decl(rest, "border-color")).toBe("#f43838");
      expect(decl(hover, "background-color")).toBe("#f43838");
    });

    test("neutral SHOULD be a ghost button", () => {
      render(<Button theme="neutral">{CHILDREN}</Button>);
      expect(decl(rule(screen.getByText(CHILDREN)), "background-color")).toBe(
        "transparent",
      );
    });

    test("focus-visible SHOULD draw a ring", () => {
      render(<Button>{CHILDREN}</Button>);
      expect(rule(screen.getByText(CHILDREN), ":focus-visible")).toContain(
        "box-shadow:0 0 0 3px",
      );
    });

    test("disabled SHOULD be not-allowed AND not fire onClick", () => {
      const onClick = jest.fn();
      render(
        <Button disabled onClick={onClick}>
          {CHILDREN}
        </Button>,
      );
      const button = screen.getByText(CHILDREN);
      expect(style(button).cursor).toBe("not-allowed");
      expect(style(button).opacity).toBe("0.55");
      fireEvent.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    test("cover SHOULD make the button full width", () => {
      render(<Button cover>{CHILDREN}</Button>);
      expect(style(screen.getByText(CHILDREN)).width).toBe("100%");
    });

    test("customTheme SHOULD override the variant colors", () => {
      const customTheme = {
        background: "#112233",
        color: "#ffffff",
        borderColor: "#112233",
        backgroundHover: "#223344",
        hoverColor: "#ffffff",
        borderHoverColor: "#223344",
        backgroundFocus: "#334455",
        focusColor: "#ffffff",
        borderFocusColor: "#334455",
      };
      render(<Button customTheme={customTheme}>{CHILDREN}</Button>);
      const el = screen.getByText(CHILDREN);
      expect(el).toBeInTheDocument();
      expect(rule(el)).toContain("background-color:#112233");
    });
  });
});
