import Lottie from "lottie-react";
import crossData from '../assets/animations/cross.json';
import gridData from '../assets/animations/grid.json';
import ovalData from '../assets/animations/oval.json';



export type CellValue = 'X' | 'O' | null;


export interface GameBoardProps {
    board: CellValue[];
    onCellClick: (index: number) => void;
    isGameOver: boolean;
    resetGame?: () => void;
}

const GameBoard: React.FC<GameBoardProps>= ({board, onCellClick, isGameOver = false}) => {
    return (
        <>
        <Lottie
                    animationData={gridData}
                    loop = {false}
                    height={30}
                    width={30}
                    className="grid-board"
                    ></Lottie>
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
                   
                    <Lottie
                    animationData={value === 'O' ? ovalData : (value === 'X' ? crossData : "")}
                    loop = {false}
                    className="chip"
                    ></Lottie>
                </button>
                
            ))

            }
        </div>
        </>
    )
}

export default GameBoard