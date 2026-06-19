import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import GameModeModal from "./GameModeModal";

describe("GameModeModal", () => {
  it("renders offline and multiplayer options when open", () => {
    render(<GameModeModal isOpen onSelect={vi.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /offline/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /multiplayer/i }),
    ).toBeInTheDocument();
  });

  it("calls onSelect when an option is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<GameModeModal isOpen onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: /offline/i }));

    expect(onSelect).toHaveBeenCalledWith("offline");
  });

  it("renders nothing when closed", () => {
    render(<GameModeModal isOpen={false} onSelect={vi.fn()} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
