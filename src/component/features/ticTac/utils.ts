import { CurrentTttPlayer } from "./types"
//will recieve one object and check agains the rule
const wining_moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]


export  function figureOutWinner(player: CurrentTttPlayer):CurrentTttPlayer {
    for (let moves of wining_moves) {
        if (player.moves.includes(moves[0]) && player.moves.includes(moves[1]) && player.moves.includes(moves[2])) {
            return { ...player, success: true }
        }
    }
    return {...player, success: false }

}


