
import styles from './style.module.css'
export default function TicTacToeComp() {

    // need to display a 3x3 grid s
    // use array and map over it

    const gridArray = new Array(9).fill(0)

    return (<>
        <div>Tic tac toe render</div>
        <div className={styles.grid}>

            {gridArray.map((gridBlock,index) => {
                
                
                return (<div key={gridBlock}>{index}</div>)
            })}
        </div>
    </>)
}