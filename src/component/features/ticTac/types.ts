export interface TicTacToe{
    name:string;
    score:number;

}

export interface CurrentTttPlayer{
    name:string;
    mark:"X"|"O";
    moves:number[];
    success:boolean;
}

