import React from 'react';
import { useGameStats } from '../hooks/useGameStats';
import { EnemyValue } from '../types/EnemyValue';

interface MenuProps {
  tracks: { id: string; label: string; src: string }[];
  enemy: {id: string; label: string}[];
  selectedTrack: string;
  onSelectTrack: (id: string) => void;
  selectedEnemy: EnemyValue;
  onSelectEnemy: (id: EnemyValue) => void;
  onStart: () => void;
}

const Menu: React.FC<MenuProps> = ({ tracks, enemy, selectedTrack, onSelectTrack, selectedEnemy, onSelectEnemy, onStart }) => {
    const {totalGames, winsX, winsO, allX, allO} = useGameStats();
    
    return(
  <div className="menu-overlay">
    <h1>Крестики и нолики</h1>
    <br/>
    <div className="menu-panel">
        <h2>Статистика</h2>
        <br/>
        <h4 className='muted-text'>Всего игр: <b className='selected-color'>{totalGames}</b></h4>
        <h4 className='muted-text'>Всего поставлено X: <b className='selected-color'>{allX}</b></h4>
        <h4 className='muted-text'>Всего поставлено O: <b className='selected-color'>{allO}</b></h4>
        <h4 className='muted-text'>Всего побед X: <b className='selected-color'>{winsX}</b></h4>
        <h4 className='muted-text'>Всего побед O: <b className='selected-color'>{winsO}</b></h4>
        <br/><br/>
      <h2>Музыка</h2>
      {tracks.map(t => (
        <div key={t.id}>
          <input type='radio'
          id={t.id}
          value={t.id}
          name='tracks'
          onChange={e => onSelectTrack(e.target.value)}
          defaultChecked={t.id === selectedTrack}></input>
          <label htmlFor={t.id}>{t.label}</label>
          </div>
        ))}
        <br/><br/>
        <h2>Противник</h2>
        {enemy.map(e => (
            <div key={e.id}>
                <input type='radio'
                id={e.id}
                value={e.id}
                name='emeny'
                onChange={e => onSelectEnemy(e.target.value as EnemyValue)}
                defaultChecked={e.id === selectedEnemy}></input>
                <label htmlFor={e.id}>{e.label} </label>
            </div>
        ))}
        
    </div>
    <br/><br/>

    <button className="start-btn" onClick={onStart}>
        Старт
      </button>

      
  </div>
);
}

export default Menu;
