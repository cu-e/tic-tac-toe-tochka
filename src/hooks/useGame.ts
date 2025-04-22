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
        newCells[index] = currentPlayer;
        if (finishGame(newCells)) return;

        switch (enemy) {
            case 'bot':
                newCells[index] = currentPlayer;
                finishGame(newCells);
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
        
        finishGame(newCells);
    };
    const finishGame = (newCells: CellValue[]) => {
         // Ничья
        if(newCells.every((e) => e !== null)){
            setWinner(null)
            registerGame(null, newCells.filter(e => e === 'X').length, newCells.filter(e => e === 'O').length)
            setGameOver(true);
            return true;
        }
         // Победа / Продолжить игру
        const [winnerSymbol, winCells] = calculateWinner(newCells);
        if (!winnerSymbol) return false;
      
        setWinner(winnerSymbol);
        registerGame(
          winnerSymbol,
          newCells.filter(e => e === 'X').length,
          newCells.filter(e => e === 'O').length
        );
        setCells(winCells);
        setGameOver(true);
        return true;
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

const calculateWinner = (cells: CellValue[]): [CellValue, CellValue[]] => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];
  
    for (const [a,b,c] of lines) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        const winner = cells[a];
        const winCells = Array(9).fill(null).map((_, idx) =>
          (idx === a || idx === b || idx === c) ? cells[idx] : null
        );
        return [winner, winCells];
      }
    }
  
    return [null, []];
  };
