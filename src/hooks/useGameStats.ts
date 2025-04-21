import { useLocalStorage } from "./useLocalStorage";



export function useGameStats() {
    const [totalGames, setTotalGames] = useLocalStorage<number>("ttt_totalGames", 0);
    
    const [winsX, setWinsX] = useLocalStorage<number>("ttt_winsX", 0);
    const [winsO, setWinsO] = useLocalStorage<number>("ttt_winsO", 0);

    const [allX, setAllX] = useLocalStorage<number>("ttt_allX", 0);
    const [allO, setAllO] = useLocalStorage<number>("ttt_allO", 0);
  
    const registerGame = (winner: "X" | "O" | null, allX : number, allO : number) => {
      setTotalGames(count => count + 1);

      setAllX((count)=> count + allX);
      setAllO((count)=> count + allO);

      if (winner === "X") setWinsX(count => count + 1);
      if (winner === "O") setWinsO(count => count + 1);
    };
  
    return { totalGames, winsX, winsO, allX, allO, registerGame};
  }