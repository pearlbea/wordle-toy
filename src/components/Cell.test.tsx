import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Cell } from "./Cell";

import { COLORS } from "../constants";

test("renders the cell component with a letter", () => {
  render(<Cell letter="A" result={null} />);
  const cellElement = screen.getByText("A");
  expect(cellElement).toBeInTheDocument();
});

test("renders the cell component with a result", () => {
  render(<Cell letter="B" result="correct" />);
  const cellElement = screen.getByText("B");
  expect(cellElement).toBeInTheDocument();
  expect(cellElement).toHaveStyle(`background-color: ${COLORS.correct}`);
});

test("cell component should have no accessibility violations", async () => {
  const { container } = render(<Cell letter="C" result="present" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
