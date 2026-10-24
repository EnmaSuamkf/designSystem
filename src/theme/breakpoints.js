import { css } from "styled-components";

// Single source of truth for the responsive breakpoint. Mobile is any viewport
// narrower than MOBILE_BREAKPOINT; from that width up the desktop layout applies.
export const MOBILE_BREAKPOINT = 768;
export const mobileQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
export const desktopQuery = `(min-width: ${MOBILE_BREAKPOINT}px)`;

// styled-components helper: mobileOnly`padding: 16px;`
export const mobileOnly = (...args) => css`
  @media ${mobileQuery} {
    ${css(...args)}
  }
`;
