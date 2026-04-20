import { CurrentTttPlayer } from "./types"
interface PropsState{
    player:CurrentTttPlayer
}
//will recieve one object and check agains the rule
const wining_moves=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
export function figureOutWinner({player}:PropsState):{player ?:CurrentTttPlayer,success:boolean}{
if(player.moves.length !== 3) return {success:false}



return {player,success:true}
}


