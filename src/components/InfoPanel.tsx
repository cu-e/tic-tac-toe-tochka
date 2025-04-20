import { useEffect, useState } from "react";
import { CellValue } from "./GameBoard";

export interface InfoPanelProps{
    winner: CellValue;
    isGameOver: boolean;
    currentPlayer: 'X' | 'O';
    
}

const InfoPanel : React.FC<InfoPanelProps> = ({winner, isGameOver, currentPlayer}) => {
    const [sec, setSec] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {setSec((prev) => (prev + 1))}, 1000)

        return () => void clearInterval(timerId)
    }, [])

    return(
        <div className="info-gui">
        <div className="border-info-gui">
            <p>{winner}</p>
            <p>{isGameOver}</p>
            <p>Сейчас ходит {currentPlayer}</p>
        </div>

        <div className="border-info-gui"><p>Время {sec}</p></div>
        </div>
    );
}

export default InfoPanel;