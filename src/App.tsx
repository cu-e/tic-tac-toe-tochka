import { useEffect, useRef, useState } from 'react';
import './App.css';
import track3 from './assets/sounds/deoxys-beats-simply-me.mp3';
import track1 from './assets/sounds/joshua-mclean-mountain-trials.mp3';
import track2 from './assets/sounds/walen-gameboy.mp3';
import GameBoard from './components/GameBoard';
import InfoPanel from './components/InfoPanel';
import Menu from './components/Menu';
import Result from './components/Result';
import useGame from './hooks/useGame';
import { EnemyValue } from './types/EnemyValue';


interface EnemyProps{
  id: EnemyValue, label: string;
}
interface TracksProps{
  id: string, label: string, src: string;
}

const TRACKS : TracksProps[]= [
  { id: "track1", label: 'Mountain Trials', src: track1 },
  { id: "track2", label: 'Walen Gameboy', src: track2 },
  { id: "track3", label: 'Deoxys Beats simply-me', src: track3 },
];

const ENEMY: EnemyProps[] = [
  { id: 'bot', label: 'БОТ' },
  { id: '1MonitorGames', label: 'Игра на одном экране'},
];

function App() {
  const { cells, currentPlayer, onCellClick, resetGame, winner, gameOver } = useGame();
  const [menuVisible, setMenuVisible] = useState(true);
  const [resultVisible, setResultVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(TRACKS[0].id);
  const [selectedEnemy, setSelectedEnemy] = useState(ENEMY[0].id);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = TRACKS.find(t => t.id === selectedTrack)!.src;
    }
  }, [selectedTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    const endGame = setTimeout(() =>{
      if (gameOver && audio) {
        setResultVisible(true);
        const fadeSteps = 20;
        const fadeStepTime = 500 / fadeSteps;
        let currentStep = 0;
  
        const fadeAudio = setInterval(() => {
          if (!audio) {
            clearInterval(fadeAudio);
            return;
          }
          currentStep++;
          const newVolume = Math.max(0, 1 - currentStep / fadeSteps);
          audio.volume = newVolume;
  
          if (currentStep >= fadeSteps) {
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 1; 
            clearInterval(fadeAudio);
          }
        }, fadeStepTime);
      }
    }, 1000)
    return () => clearTimeout(endGame);
  }, [gameOver]);

  const handleStart = (selectedEmeny : EnemyValue) => {
    console.log(selectedEmeny)
    resetGame(selectedEmeny);
    setMenuVisible(false);
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play();
    }
  };

  const handleMenu = () => {
    setResultVisible(false);
    setMenuVisible(true);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" />

      {menuVisible ? (
        
        <Menu
          tracks={TRACKS}
          enemy={ENEMY}
          selectedTrack={selectedTrack}
          onSelectTrack={setSelectedTrack}
          selectedEnemy={selectedEnemy}
          onSelectEnemy={setSelectedEnemy}
          onStart={() => handleStart(selectedEnemy)}
        />

      ) : (<>{!resultVisible ? (
        <>
        
        <div className="gameplay-container">
          <GameBoard
            board={cells}
            onCellClick={onCellClick}
            isGameOver={gameOver}
          />
                    <InfoPanel winner={null} isGameOver={false} currentPlayer={currentPlayer} />

          <div className="tv-light" />
        </div>
        <img className='img-back'></img>
      </>
      ): (<>
      <Result winner={winner} onMenu={handleMenu}        
      />
      </>)
      }</>)
      }
    </>
  );
}

export default App;
