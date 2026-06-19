import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GameDefinition } from "@/lib/games/types";
import GameWindowCard from "./GameWindowCard";

const availableGame: GameDefinition = {
  id: "tic-tac-toe",
  title: "Tic-Tac-Toe",
  description: "Classic online matches.",
  playersLabel: "2 players",
  available: true,
};

const unavailableGame: GameDefinition = {
  id: "chess",
  title: "Chess",
  description: "Coming later.",
  playersLabel: "2 players",
  available: false,
};

describe("GameWindowCard", () => {
  it("renders game details", () => {
    render(<GameWindowCard game={availableGame} onSelect={vi.fn()} />);

    expect(screen.getByText("Tic-Tac-Toe")).toBeInTheDocument();
    expect(screen.getByText("Classic online matches.")).toBeInTheDocument();
    expect(screen.getByText("2 players")).toBeInTheDocument();
  });

  it("calls onSelect when an available game is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<GameWindowCard game={availableGame} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Open Tic-Tac-Toe" }));

    expect(onSelect).toHaveBeenCalledWith("tic-tac-toe");
  });

  it("does not call onSelect when the game is unavailable", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<GameWindowCard game={unavailableGame} onSelect={onSelect} />);

    expect(screen.getByRole("button", { name: "Open Chess" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Open Chess" }));

    expect(onSelect).not.toHaveBeenCalled();
  });
});
