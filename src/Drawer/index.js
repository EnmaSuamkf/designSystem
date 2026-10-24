import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getThemeValue } from "../theme/util";
import { mobileOnly } from "../theme/breakpoints";

const FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

const Panel = styled.nav`
  box-sizing: border-box;
  flex: 0 0 ${({ $width }) => $width};
  align-self: stretch;
  width: ${({ $width }) => $width};
  padding: 16px 12px 24px;
  background: ${() => getThemeValue("$theme_neutral_color_0")};
  border-right: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  font-family: ${FONT_STACK};
  overflow-y: auto;
  ${mobileOnly`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1100;
    flex: none;
    width: min(280px, 85vw);
    max-width: 85vw;
    padding-top: 24px;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
    transform: translateX(-100%);
    visibility: hidden;
    transition:
      transform 0.2s ease,
      visibility 0s linear 0.2s;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
    &[data-open="true"] {
      transform: translateX(0);
      visibility: visible;
      transition:
        transform 0.2s ease,
        visibility 0s;
    }
  `}
`;

const Backdrop = styled.div`
  display: none;
  ${mobileOnly`
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1050;
    background: rgba(17, 24, 39, 0.5);
  `}
`;

// Side navigation: a static column (width) from the mobile breakpoint up, and
// an overlay drawer with backdrop below it. "open" only matters on mobile. It
// closes on backdrop click and Escape, moves the focus to the first link when
// it opens and locks the page scroll while it is open.
const Drawer = ({
  open = false,
  onClose = () => {},
  id,
  ariaLabel,
  width = "240px",
  children,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    panelRef.current?.querySelector("a[href], button")?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      {open && (
        <Backdrop
          data-testid="drawer-backdrop"
          aria-hidden="true"
          onClick={onClose}
        />
      )}
      <Panel
        ref={panelRef}
        id={id}
        aria-label={ariaLabel}
        data-open={open}
        $width={width}
      >
        {children}
      </Panel>
    </>
  );
};
Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.node,
};
export default Drawer;
