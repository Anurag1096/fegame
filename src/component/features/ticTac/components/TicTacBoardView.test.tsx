import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TicTacBoardView from "./TicTacBoardView";

const baseProps = {
  board: Array(9).fill(null) as Array<"X" | "O" | null>,
  winnerLabel: null,
  drawLabel: null,
  canPlay: true,
  onCellClick: vi.fn(),
  onRestart: vi.fn(),
};

describe("TicTacBoardView", () => {
  it("renders the board and restart button", () => {
    render(<TicTacBoardView {...baseProps} />);

    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
  });

  it("calls onRestart when restart is clicked", async () => {
    const user = userEvent.setup();
    const onRestart = vi.fn();

    render(<TicTacBoardView {...baseProps} onRestart={onRestart} />);
    await user.click(screen.getByRole("button", { name: "Restart" }));

    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it("shows winner and draw labels", () => {
    render(
      <TicTacBoardView
        {...baseProps}
        winnerLabel="player1 Winner"
        drawLabel="Match Drawn"
      />,
    );

    expect(screen.getByText("player1 Winner")).toBeInTheDocument();
    expect(screen.getByText("Match Drawn")).toBeInTheDocument();
  });
});
