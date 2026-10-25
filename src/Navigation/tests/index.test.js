import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Navigation,
  NavigationFooterButton,
  NavigationGroups,
  NavigationLink,
  NavigationMain,
  NavigationSidebar,
} from "../index";

const ControlledAccordion = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AccordionItem>
      <AccordionButton
        expanded={expanded}
        controls="catalog-panel"
        icon={<span data-testid="icon">icon</span>}
        onClick={() => setExpanded((current) => !current)}
      >
        Catálogo
      </AccordionButton>
      <AccordionPanel id="catalog-panel" expanded={expanded}>
        <NavigationLink href="/products">Productos</NavigationLink>
      </AccordionPanel>
    </AccordionItem>
  );
};

describe("Navigation", () => {
  test("SHOULD render an accessible controlled accordion", () => {
    render(<ControlledAccordion />);
    const trigger = screen.getByRole("button", { name: "Catálogo" });
    const panel = document.getElementById("catalog-panel");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", "catalog-panel");
    expect(panel).toHaveAttribute("hidden");
    expect(screen.getByTestId("icon")).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("hidden");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("SHOULD support keyboard activation through its native button", () => {
    render(<ControlledAccordion />);
    const trigger = screen.getByRole("button", { name: "Catálogo" });

    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Enter" });
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("SHOULD render reusable sidebar and content shells", () => {
    render(
      <>
        <NavigationSidebar aria-label="Menú" width="260px">
          <Navigation>
            <NavigationGroups>groups</NavigationGroups>
            <NavigationFooterButton>Salir</NavigationFooterButton>
          </Navigation>
        </NavigationSidebar>
        <NavigationMain sidebarWidth="260px">content</NavigationMain>
      </>,
    );

    expect(screen.getByLabelText("Menú")).toHaveStyle({
      position: "fixed",
      width: "260px",
      overflowY: "auto",
    });
    expect(screen.getByText("content")).toHaveStyle({
      marginLeft: "260px",
    });
    expect(screen.getByRole("button", { name: "Salir" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  test("SHOULD allow content without reserving sidebar space", () => {
    render(<NavigationMain withSidebar={false}>content</NavigationMain>);

    expect(screen.getByText("content")).toHaveStyle({
      width: "100%",
      marginLeft: "0",
    });
  });
});
