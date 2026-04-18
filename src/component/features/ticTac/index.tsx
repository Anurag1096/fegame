
import styles from './style.module.css'
import { useState } from 'react'
import { CurrentTttPlayer } from './types'
export default function TicTacToeComp() {
    
    const gridArray = new Array(9).fill(0)
    const [grid, setGrid] = useState(gridArray)
    const [player, setPlayer] = useState<{ X: CurrentTttPlayer, O: CurrentTttPlayer }>({
        X: { name: 'player1', mark: 'X', moves: [] },
        O: { name: 'player2', mark: "O", moves: [] }
    })
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")

    /* 
    -The handle grid click will just add the clicked grid value to the 
    -respective player , when the user will click a grid, its value of the row will
    be saved to currentPlayer state , this sate will  
    */
    function handleGridClick(e: React.MouseEvent<HTMLDivElement>, index: number) {
        e.preventDefault()
        if(player.X.moves.includes(index) || player.O.moves.includes(index) ) return 
        // get the mark of current player 
        setPlayer((prev) => ({ ...prev, [currentPlayer]: { ...prev[currentPlayer], moves: [...prev[currentPlayer].moves, index] } }))
        setGrid(prev => [...prev.slice(0, index), currentPlayer, ...prev.slice(index + 1)])
        // after every click change the current player to the other player
        //this place will check for winner or draw.
        setCurrentPlayer(prev => (prev === "X" ? "O" : "X"))

    }

    return (<>
        <div>Tic tac toe render</div>
        <div className={styles.grid}>

            {grid.map((gridBlock, index) => {
                return (<div
                    
                    key={`${gridBlock}${index}`}
                    onClick={(e) => handleGridClick(e, index)}
                >{gridBlock ? gridBlock : " "}</div>)
            })}
        </div>
    </>)
}