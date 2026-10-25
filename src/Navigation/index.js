import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getThemeValue } from "../theme/util";

const FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

const StyledSidebar = styled.aside`
  position: fixed;
  top: ${({ $top }) => $top};
  bottom: 0;
  left: 0;
  z-index: ${({ $zIndex }) => $zIndex};
  box-sizing: border-box;
  width: ${({ $width }) => $width};
  padding: 16px 12px 24px;
  overflow-y: auto;
  background: ${() => getThemeValue("$theme_neutral_color_0")};
  border-right: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  font-family: ${FONT_STACK};
`;

// Fixed desktop navigation shell. Routing and responsive visibility stay with
// the consuming application.
export const NavigationSidebar = ({
  width = "260px",
  top = "56px",
  zIndex = 100,
  children,
  ...props
}) => (
  <StyledSidebar $width={width} $top={top} $zIndex={zIndex} {...props}>
    {children}
  </StyledSidebar>
);

NavigationSidebar.propTypes = {
  width: PropTypes.string,
  top: PropTypes.string,
  zIndex: PropTypes.number,
  children: PropTypes.node,
};

const StyledMain = styled.main`
  box-sizing: border-box;
  width: ${({ $withSidebar, $sidebarWidth }) =>
    $withSidebar ? `calc(100% - ${$sidebarWidth})` : "100%"};
  min-width: 0;
  min-height: ${({ $minHeight }) => $minHeight};
  margin-left: ${({ $withSidebar, $sidebarWidth }) =>
    $withSidebar ? $sidebarWidth : "0"};
  background: ${({ $background }) => $background};
`;

// Content companion for NavigationSidebar. It reserves the sidebar width
// without knowing how the application decides between desktop and mobile.
export const NavigationMain = ({
  withSidebar = true,
  sidebarWidth = "260px",
  minHeight = "calc(100vh - 56px)",
  background = "#f6f7f9",
  children,
  ...props
}) => (
  <StyledMain
    $withSidebar={withSidebar}
    $sidebarWidth={sidebarWidth}
    $minHeight={minHeight}
    $background={background}
    {...props}
  >
    {children}
  </StyledMain>
);

NavigationMain.propTypes = {
  withSidebar: PropTypes.bool,
  sidebarWidth: PropTypes.string,
  minHeight: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.node,
};

export const Navigation = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: ${({ $minHeight = "calc(100vh - 104px)" }) => $minHeight};
  font-family: ${FONT_STACK};
`;

export const NavigationGroups = styled.div`
  flex: 1 0 auto;
`;

export const AccordionItem = styled.div`
  margin-bottom: 4px;
`;

const StyledAccordionButton = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 8px 10px;
  border: 0;
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  background: ${({ $active }) =>
    $active ? getThemeValue("$theme_primary_color_30") : "transparent"};
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  &:hover {
    background: ${() => getThemeValue("$theme_neutral_color_30")};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${() => getThemeValue("$theme_secondary_color_70")};
  }
`;

const AccordionTitle = styled.span`
  flex: 1;
`;

const Chevron = styled.span`
  font-size: 18px;
  line-height: 1;
  transform: rotate(${({ $expanded }) => ($expanded ? "90deg" : "0deg")});
  transition: transform 0.15s ease;
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// Controlled accordion trigger. Native button semantics provide Enter and
// Space keyboard support; consumers own only the expanded state.
export const AccordionButton = ({
  expanded,
  controls,
  active = false,
  icon,
  children,
  onClick,
  ...props
}) => (
  <StyledAccordionButton
    type="button"
    aria-expanded={expanded}
    aria-controls={controls}
    $active={active}
    onClick={onClick}
    {...props}
  >
    {icon ? <span aria-hidden="true">{icon}</span> : null}
    <AccordionTitle>{children}</AccordionTitle>
    <Chevron $expanded={expanded} aria-hidden="true">
      ›
    </Chevron>
  </StyledAccordionButton>
);

AccordionButton.propTypes = {
  expanded: PropTypes.bool.isRequired,
  controls: PropTypes.string.isRequired,
  active: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

const StyledAccordionPanel = styled.div`
  padding: 2px 0 6px 24px;
`;

export const AccordionPanel = ({ id, expanded, children, ...props }) => (
  <StyledAccordionPanel id={id} hidden={!expanded} {...props}>
    {children}
  </StyledAccordionPanel>
);

AccordionPanel.propTypes = {
  id: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

// Polymorphic anchor: consumers may pass `as={NavLink}` without adding a
// router dependency to the Design System.
export const NavigationLink = styled.a`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 44px;
  margin: 2px 0;
  padding: 8px 12px 8px 9px;
  border-left: 3px solid transparent;
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: ${() => getThemeValue("$theme_neutral_color_90")};
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
  &:visited {
    color: ${() => getThemeValue("$theme_neutral_color_90")};
  }
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    text-decoration: none;
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${() => getThemeValue("$theme_secondary_color_70")};
  }
  &.active {
    background: ${() => getThemeValue("$theme_primary_color_30")};
    border-left-color: ${() => getThemeValue("$theme_primary_color_100")};
    color: ${() => getThemeValue("$theme_neutral_color_100")};
    font-weight: 600;
  }
`;

export const NavigationFooterButton = styled.button.attrs({ type: "button" })`
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  margin-top: 20px;
  padding: 10px 12px;
  border: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  background: transparent;
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  &:hover {
    background: ${() => getThemeValue("$theme_neutral_color_30")};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${() => getThemeValue("$theme_secondary_color_70")};
  }
`;
