import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Game } from "./Game";

test("renders the game component", () => {
  render(<Game />);
  const gameElement = screen.getByText(/submit/i);
  expect(gameElement).toBeInTheDocument();
});

// after submitting a row, 
// the next row should be be active and empty, and it's first input should be focused
test("focus moves to the first input in the next row after submitting a row", () => {
  render(<Game />);

  const activeRow = screen.getByTestId("active-row");
  expect(activeRow).toBeInTheDocument();
  const inputs = within(activeRow).getAllByRole("textbox");
  const firstInputActiveRow = inputs[0];
  expect(firstInputActiveRow).toHaveFocus();
  userEvent.type(firstInputActiveRow, "a");

  userEvent.type(inputs[1], "b");
  userEvent.type(inputs[2], "c");
  userEvent.type(inputs[3], "d");
  userEvent.type(inputs[4], "e");

  const submitButton = screen.getByText(/submit/i);
  userEvent.click(submitButton);

  const secondRow = screen.getByTestId("active-row");
  const firstInputSecondRow = within(secondRow).getAllByRole("textbox")[0];
  expect(firstInputSecondRow).toHaveFocus();
  expect(firstInputSecondRow.textContent).toBe("");
});
