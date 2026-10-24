import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import ListWithLink from "../index";

const TITLE = "ListWithLink";
const LIST_WITH_PATH = [
  { _id: "1", name: "name1", path: "path1" },
  { _id: "2", name: "name2", path: "path2" },
];

describe("ListWithLink component", () => {
  test("renders title and items", () => {
    render(<ListWithLink title={TITLE} list={LIST_WITH_PATH} />);
    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getByText("name1")).toBeInTheDocument();
  });

  test("executes onClick when item is clicked", () => {
    const onClick = jest.fn();
    render(
      <ListWithLink title={TITLE} list={LIST_WITH_PATH} onClick={onClick} />,
    );
    fireEvent.click(screen.getByText("name1"));
    expect(onClick).toHaveBeenCalledWith(LIST_WITH_PATH[0]);
  });
});
