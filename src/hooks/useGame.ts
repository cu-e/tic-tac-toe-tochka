import { useState } from "react";
import { CellValue } from '../components/GameBoard';
import { useGameStats } from './useGameStats';

interface UseGameResult {
    cells: CellValue[];
    onCellClick: (index: number) => void;
    currentPlayer: 'X' | 'O';
    resetGame: () => void;
    gameOver: boolean;
    winner: CellValue;
}

const useGame = () : UseGameResult => {


    const [cells, setCells] = useState<CellValue[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [winner, setWinner] = useState<CellValue>(null);
    const {registerGame} = useGameStats();

    const [gameOver, setGameOver] = useState<boolean>(false);


    const onCellClick = (index : number) =>{
        const next = [...cells];
        next[index] = currentPlayer;
        setCells(next);

        if(next.every((e) => e !== null)){
            setWinner(null)
            registerGame(null, next.filter(e => e === 'X').length, next.filter(e => e === 'O').length)
            setGameOver(true);
        }
    
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

        const calcWinner = calculateWinner(next);
        if (calcWinner) {
            const winCells : CellValue[] = Array(9).fill(null);
            next.map((a, index) => {
                if(calcWinner?.includes(index)){
                    winCells[index] = a
                }
            })
            setWinner(currentPlayer)
            registerGame(currentPlayer, next.filter(e => e === 'X').length, next.filter(e => e === 'O').length)
            setCells(winCells);
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setCells(Array(9).fill(null));
        setCurrentPlayer('X');
        setGameOver(false);
      };

    return {cells, currentPlayer, onCellClick, resetGame, winner, gameOver};
  };

export default useGame;

const calculateWinner = (cells : CellValue[]) => {
    const lines = [
        [0, 1, 2], // Первая строка
        [3, 4, 5], // Вторая строка
        [6, 7, 8], // Третья строка
        [0, 3, 6], // Первый столбец
        [1, 4, 7], // Второй столбец
        [2, 5, 8], // Третий столбец
        [0, 4, 8], // Диагональ слева‑направо
        [2, 4, 6], // Диагональ справа‑налево
      ];
    
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
          return lines[i];
        }
    }
    
      return null;
};
