
export type CellValue = 'X' | 'O' | null;

export interface GameBoardProps {
    board: CellValue[];
    onCellClick: (index: number) => void;
    isGameOver: boolean;
    resetGame?: () => void;
    winner: string;
}

const GameBoard: React.FC<GameBoardProps>= ({board, onCellClick, isGameOver = false}) => {
    return (
        <div className="game-board">
            {board.map((value, index) =>(
                <button
                key={index}
                className="cell"
                onClick={() => {
                    if(!isGameOver && value === null){
                        onCellClick(index);
                    }
                }}
                disabled={isGameOver || value !== null}
                >
                    {value}
                </button>
            ))

            }
        </div>
    )
}

export default GameBoard