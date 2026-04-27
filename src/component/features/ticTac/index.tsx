
import styles from './style.module.css'
import { useState } from 'react'
import { CurrentTttPlayer } from './types'
import { Squircle } from '@squircle-js/react'
import { figureOutWinner } from './utils'
export default function TicTacToeComp() {
    
    const gridArray = new Array(9).fill(0)
    const [grid, setGrid] = useState(gridArray)
    const [player, setPlayer] = useState<{ X: CurrentTttPlayer, O: CurrentTttPlayer }>({
        X: { name: 'player1', mark: 'X', moves: [] },
        O: { name: 'player2', mark: "O", moves: [] }
    })
    const [winner,setWinner]=useState<string>("")
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")

    /* 
    -The handle grid click will just add the clicked grid value to the 
    -respective player , when the user will click a grid, its value of the row will
    be saved to currentPlayer state , this sate will  
    */
    function handleGridClick(e: React.MouseEvent<HTMLDivElement>, index: number) {
        e.preventDefault()
        if(winner) return
        if(player.X.moves.includes(index) || player.O.moves.includes(index) ) return 
        // get the mark of current player 
        setPlayer((prev) => ({ ...prev, [currentPlayer]: { ...prev[currentPlayer], moves: [...prev[currentPlayer].moves, index] } }))
        setGrid(prev => [...prev.slice(0, index), currentPlayer, ...prev.slice(index + 1)])
        // after every click change the current player to the other player
        //this place will check for winner or draw.
        let result= figureOutWinner(player[currentPlayer])
        if(result.success){
            let win=result?.player?.name
            setWinner(win?win:"")
            return
        }
        //now if success is false it will check if the game is draw or not
        if(!grid.includes(0)) setWinner("Draw") 
        setCurrentPlayer(prev => (prev === "X" ? "O" : "X"))
        
    }

    return (<>
        <div>Tic tac toe render</div>
        <Squircle cornerRadius={25} cornerSmoothing={0.7} className={styles.grid}>

            {grid.map((gridBlock, index) => {
                return (
                <Squircle  
                cornerRadius={25}
                cornerSmoothing={0.7}  
                key={`${gridBlock}${index}`}
                onClick={(e) => handleGridClick(e, index)}
                >{gridBlock ? gridBlock : " "}
                
                </Squircle>)
            })}
        </Squircle>

        <div>{winner?`Result: ${winner} Winner`:" ---"}</div>
    </>)
}