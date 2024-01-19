import React from "react";
import { render, screen } from "@testing-library/react";
import Image from "..";

describe("Image", () => {
  test("WHEN loadig is true SHOULD display loading", () => {
    render(<Image device="mobile" loadingBannerImage={true} urlImage="url" />);
    expect(screen.getByTestId("loading-box")).toBeInTheDocument();
  });
  test("WHEN loading is false SHOULD not display test id", () => {
    render(<Image device="mobile" loadingBannerImage={false} urlImage="url" />);
    expect(screen.queryByTestId("loading-box")).not.toBeInTheDocument();
  });
});
