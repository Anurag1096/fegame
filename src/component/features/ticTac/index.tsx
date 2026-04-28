'use client'
import styles from './style.module.css'
import { useState, useEffect,useRef } from 'react'
import { CurrentTttPlayer } from './types'
import { Squircle } from '@squircle-js/react'
import { figureOutWinner } from './utils'
export default function TicTacToeComp() {

    const gridArray = new Array(9).fill(0)
    const [grid, setGrid] = useState(gridArray)
    const [player, setPlayer] = useState<{ X: CurrentTttPlayer, O: CurrentTttPlayer }>({
        X: { name: 'player1', mark: 'X', moves: [], success: false },
        O: { name: 'player2', mark: "O", moves: [], success: false }
    })
    const [winner, setWinner] = useState<string>("")
    const [draw ,setDraw] =useState<string>("")
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  
    /*
    The checking will be handled by the use effecy function to update values
    */

    useEffect(() => {
        let result = figureOutWinner(player[currentPlayer])
        if (result.success) {
            let win = result.name
            setWinner(win ? win : "")
            return
        }
        if (!grid.includes(0)) setDraw("Draw")
    }, [grid,player])

    /* 
    -The handle grid click will just add the clicked grid value to the 
    -respective player , when the user will click a grid, its value of the row will
    be saved to currentPlayer state , this sate will  
    */
   function handleMatchRestart(){
    setGrid(gridArray)
    setPlayer({
        X: { name: 'player1', mark: 'X', moves: [], success: false },
        O: { name: 'player2', mark: "O", moves: [], success: false }
    })
    setCurrentPlayer('X')
    setWinner("")
    setDraw("")
   }
    function handleGridClick(e: React.MouseEvent<HTMLDivElement>, index: number) {
        e.preventDefault()
        if (winner) return
        if (!grid.includes(0)) return
        if (player.X.moves.includes(index) || player.O.moves.includes(index)) return
        // get the mark of current player 
        setPlayer((prev) => ({ ...prev, [currentPlayer]: { ...prev[currentPlayer], moves: [...prev[currentPlayer].moves, index] } }))
        setGrid(prev => [...prev.slice(0, index), currentPlayer, ...prev.slice(index + 1)])
        // after every click change the current player to the other player
        setCurrentPlayer(prev => (prev === "X" ? "O" : "X"))

    }




    return (<>
        <div>Tic tac toe render</div>
        <Squircle  cornerRadius={25} cornerSmoothing={0.7} className={styles.grid}>

            {grid.map((gridBlock, index) => {
                return (
                    <Squircle
                    /// <reference path="" />
                        
                        cornerRadius={25}
                        cornerSmoothing={0.7}
                        key={`${gridBlock}${index}`}
                        onClick={(e) => handleGridClick(e, index)}
                    >{gridBlock ? gridBlock : " "}

                    </Squircle>)
            })}
        </Squircle>
        <div>
            <button onClick={handleMatchRestart} >Restart</button>
        </div>

        <div>{winner ? `${winner} Winner` : " "}</div>
        <div>{draw ? `Match Drawn`:" "}</div>
    </>)
}