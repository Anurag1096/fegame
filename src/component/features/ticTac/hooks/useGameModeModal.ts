import { useState } from "react";
import { GameMode } from "../types";

export function useGameModeModal() {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  function selectMode(mode: GameMode) {
    setSelectedMode(mode);
  }

  function openModal() {
    setSelectedMode(null);
  }

  return {
    isOpen: selectedMode === null,
    selectedMode,
    selectMode,
    openModal,
  };
}
