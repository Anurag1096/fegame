import { useState } from 'react'


export function usePlayer() {

    const [player, setPlayer] = useState<{ X: CurrentTttPlayer, O: CurrentTttPlayer }>({
        X: { name: 'player1', mark: 'X', moves: [], success: false },
        O: { name: 'player2', mark: "O", moves: [], success: false }
    })
    const [winner, setWinner] = useState<string>("")
    const [draw, setDraw] = useState<string>("")
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")

    return { player, setPlayer, winner, setWinner, draw, setDraw, currentPlayer, setCurrentPlayer }
}