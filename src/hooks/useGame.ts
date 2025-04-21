import { useState } from "react";
import { CellValue } from '../components/GameBoard';
import { EnemyValue } from "../types/EnemyValue";
import { useGameStats } from './useGameStats';

interface UseGameResult {
    cells: CellValue[];
    onCellClick: (index: number) => void;
    currentPlayer: 'X' | 'O';
    resetGame: (enemy: EnemyValue ) => void;
    gameOver: boolean;
    winner: CellValue;
}

const useGame = () : UseGameResult => {


    const [cells, setCells] = useState<CellValue[]>(Array(9).fill(null));
    const [enemy, setEnemy] = useState<EnemyValue>();
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [winner, setWinner] = useState<CellValue>(null);
    const {registerGame} = useGameStats();

    const [gameOver, setGameOver] = useState<boolean>(false);


    const onCellClick = (index : number) =>{
        const newCells = [...cells];

        switch (enemy) {
            case 'bot':
                newCells[index] = currentPlayer;

                    {
                        const allowIndex = newCells.reduce<number[]>((acc, e, idx) =>{
                            if (e === null) acc.push(idx);
                            return acc;
                            
                        },[])
                        newCells[allowIndex[Math.floor(Math.random() * allowIndex.length)]] = 'O';

                    }

                    setCells(newCells);
                    
                break;
            case '1MonitorGames':
                    newCells[index] = currentPlayer;

                    setCells(newCells);
                    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
                    
                break;
        }



        // Ничья
        if(newCells.every((e) => e !== null)){
            setWinner(null)
            registerGame(null, newCells.filter(e => e === 'X').length, newCells.filter(e => e === 'O').length)
            setGameOver(true);
        }
        
        // Победа
        const calcWinner = calculateWinner(newCells);
        if (calcWinner[1]) {
            const winCells : CellValue[] = Array(9).fill(null);
            newCells.map((a, index) => {
                if(calcWinner[1]?.includes(index as never)){
                    winCells[index] = a
                }
            })
            setWinner(calcWinner[0] as CellValue)
            registerGame(currentPlayer, newCells.filter(e => e === 'X').length, newCells.filter(e => e === 'O').length)
            setCells(winCells);
            setGameOver(true);
        }
    };
    const resetGame = (enemy: EnemyValue) => {
        setCells(Array(9).fill(null));
        setEnemy(enemy);
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
          return [cells[a], lines[i]];
        }
    }
    
      return [null, null];
};
