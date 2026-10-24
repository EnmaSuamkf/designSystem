import React from "react";
import { render, screen, within } from "@testing-library/react";
import DataTable, { ItemList, ItemRow, RowActions } from "../index";

const columns = [
  { key: "name", header: "Nombre" },
  { key: "stock", header: "Stock" },
  { key: "actions", header: "Acciones" },
];
const rows = [
  {
    key: "1",
    cells: {
      name: "Globos",
      stock: 50,
      actions: (
        <RowActions>
          <button>Ver</button>
          <button>Eliminar</button>
        </RowActions>
      ),
    },
  },
  {
    key: "2",
    cells: { name: "Velas", stock: 10, actions: <button>Ver</button> },
  },
];

describe("DataTable", () => {
  test("AT desktop width SHOULD render a table and no cards", () => {
    render(<DataTable columns={columns} rows={rows} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.queryByTestId("data-card")).not.toBeInTheDocument();
  });

  test("AT mobile width SHOULD render one card per row and no table", () => {
    render(<DataTable columns={columns} rows={rows} isMobile />);
    expect(screen.getAllByTestId("data-card")).toHaveLength(2);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  test("AT mobile width SHOULD list header text as label and cell as value", () => {
    render(<DataTable columns={columns} rows={rows} isMobile />);
    const card = within(screen.getAllByTestId("data-card")[0]);
    expect(card.getByText("Nombre")).toBeInTheDocument();
    expect(card.getByText("Globos")).toBeInTheDocument();
    expect(card.getByText("Stock")).toBeInTheDocument();
    expect(card.getByText("50")).toBeInTheDocument();
  });

  test("AT mobile width SHOULD keep the actions without a label", () => {
    const onClick = jest.fn();
    render(
      <DataTable
        isMobile
        columns={columns}
        rows={[
          {
            key: "1",
            cells: {
              name: "Globos",
              stock: 1,
              actions: <button onClick={onClick}>Ver</button>,
            },
          },
        ]}
      />,
    );
    screen.getByText("Ver").click();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Acciones")).not.toBeInTheDocument();
  });

  test("ItemRow SHOULD render content and actions", () => {
    render(
      <ItemList>
        <ItemRow actions={<button>Eliminar</button>}>Argentina</ItemRow>
      </ItemList>,
    );
    expect(screen.getByText("Argentina")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });
});
