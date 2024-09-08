


const n = 4;


function PrintSolution(board: Array<Array<number>>) {
   
    for (let i = 0; i < n; i++) {
        let temp = "";
        for (let j = 0; j < n; j++) {
            if (board[i][j] == 1) {
                // document.write("Q ");
                temp += "Q ";
            }
            else {
                // document.write(". ");
                temp += ". ";
            }
        }
        console.log(temp);
        // document.write("</br>");
        

    }
}



function IsAvailable(board: Array<Array<number>>, row: number, col: number) {
    for (let i = 0; i < col; i++) {
        if (board[row][i] == 1)
            return false
    }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j])
            return false

    for (let i = row, j = col; j >= 0 && i < n; i++, j--)
        if (board[i][j])
            return false

    return true
}







export function solveNQueenUtil(board: Array<Array<number>>, columns: number) {
    
    if (columns >= n) {
        return true;
    }

    for (let i = 0; i < n; i++) {
        console.log(JSON.parse(JSON.stringify(board)));   
        if (IsAvailable(board, i, columns)) {
            board[i][columns] = 1;

            if (solveNQueenUtil(board, columns + 1)) {
                return true;
            }
            board[i][columns] = 0;
        }
    }
    return false;
}


export default function solveNQueen(){
    let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

    if (!solveNQueenUtil(board,0)){
        document.write("solution doesn't exist");
        return false;
    }
    PrintSolution(board);
    return true;
}

