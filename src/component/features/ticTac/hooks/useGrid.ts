import { useEffect, useState } from "react";

export function useGrid() {
  const [grid, setGrid] = useState(new Array(9).fill(0))

  return { grid, setGrid }


}