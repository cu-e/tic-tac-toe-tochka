import React from 'react';
import { CellValue } from './GameBoard';

interface ResultProps {
  winner: CellValue;
  onMenu: () => void;
}

const Result: React.FC<ResultProps> = ({ winner, onMenu }) => {
  
  return (
  <div className="menu-overlay">
    {winner == null ? (<h1>Ничья!</h1>) : (<h1>Победа игрока <b className='selected-color'>{winner}</b></h1>)}
    <br/>
    <div className="menu-panel">
    </div>
    <button className="start-btn" onClick={onMenu}>
        В меню
      </button>

      
  </div>
)};

export default Result;
