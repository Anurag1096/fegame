
import styles from './style.module.css'
import {useState} from 'react'
export default function TicTacToeComp() {

    // need to display a 3x3 grid s
    // use array and map over it

    const gridArray = new Array(9).fill(0)
    const [grid,setGrid]=useState<number[]>(gridArray) 
    function handleGridClick(e:React.MouseEvent<HTMLDivElement>){
        e.preventDefault()
        console.log(e.target)

    }
    return (<>
        <div>Tic tac toe render</div>
        <div className={styles.grid}>

            {grid.map((gridBlock,index) => {
                return (<div key={`${gridBlock}${index}`}
                onClick={handleGridClick}
                
                >{index}</div>)
            })}
        </div>
    </>)
}