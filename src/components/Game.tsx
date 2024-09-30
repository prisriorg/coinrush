// import React, { useState } from 'react';

// const TicTacToe: React.FC = () => {
//   const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
//   const [isXNext, setIsXNext] = useState(true);
//   const winner = calculateWinner(board);

//   const handleClick = (index: number) => {
//     if (board[index] || winner) return; // Prevent overwriting or playing if game is won

//     const newBoard = board.slice();
//     newBoard[index] = isXNext ? 'X' : 'O';
//     setBoard(newBoard);
//     setIsXNext(!isXNext);

//     if (winner) return;

//     // Bot's turn
//     const botIndex = findBestMove(newBoard);
//     if (botIndex !== -1) {
//       newBoard[botIndex] = 'O';
//       setBoard(newBoard);
//       setIsXNext(true);
//     }
//   };

//   const renderSquare = (index: number) => (
//     <button
//       className="border-2 border-gray-500 w-20 h-20 text-4xl font-bold"
//       onClick={() => handleClick(index)}
//     >
//       {board[index]}
//     </button>
//   );

//   const resetGame = () => {
//     setBoard(Array(9).fill(null));
//     setIsXNext(true);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1>
//       <div className="grid grid-cols-3 gap-2 mb-4">
//         {board.map((_, index) => renderSquare(index))}
//       </div>
//       {winner && <h2 className="text-2xl">{`Winner: ${winner}`}</h2>}
//       {!winner && board.every((cell) => cell) && <h2 className="text-2xl">It's a Tie!</h2>}
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         onClick={resetGame}
//       >
//         Reset Game
//       </button>
//     </div>
//   );
// };

// // Function to determine the winner
// const calculateWinner = (squares: Array<string | null>): string | null => {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
  
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// };

// // Basic AI bot to find the best move
// const findBestMove = (board: Array<string | null>): number => {
//   const emptySquares = board.map((value, index) => (value === null ? index : null)).filter(v => v !== null) as number[];

//   if (emptySquares.length > 0) {
//     return emptySquares[Math.floor(Math.random() * emptySquares.length)]; // Randomly select an empty square
//   }
  
//   return -1;
// };

// export default TicTacToe;
import React, { useState } from 'react';

const choices = ['Rock', 'Paper', 'Scissors'] as const;
type Choice = typeof choices[number];

const Game: React.FC = () => {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [botChoice, setBotChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>('');

  const handleUserChoice = (choice: Choice) => {
    setUserChoice(choice);
    const randomIndex = Math.floor(Math.random() * choices.length);
    const botSelection = choices[randomIndex];
    setBotChoice(botSelection);
    determineWinner(choice, botSelection);
  };

  const determineWinner = (user: Choice, bot: Choice) => {
    if (user === bot) {
      setResult('It\'s a tie!');
    } else if (
      (user === 'Rock' && bot === 'Scissors') ||
      (user === 'Paper' && bot === 'Rock') ||
      (user === 'Scissors' && bot === 'Paper')
    ) {
      setResult('You win!');
    } else {
      setResult('You lose!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl font-bold mb-4">Rock-Paper-Scissors</h1>
      <div className="flex space-x-4 mb-6">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleUserChoice(choice)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {choice}
          </button>
        ))}
      </div>
      {userChoice && <p className="text-xl">You chose: {userChoice}</p>}
      {botChoice && <p className="text-xl">Bot chose: {botChoice}</p>}
      {result && <p className="text-2xl font-bold mt-4">{result}</p>}
    </div>
  );
};

export default Game;
