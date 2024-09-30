import  React,{ useState } from "react";
import WatchAndEarn from "./WatchAndEarn";

const Home = () => {
  // const [stakeAmount, setStakeAmount] = useState(100); // Default stake amount
  // const tonPrice = 2.59; // Price of 1 TON in USD
  // const apy = 4.64; // APY percentage

  // const handleStakeAmountChange = (e: any) => {
  //   setStakeAmount(e.target.value);
  // };

  return (
    // <><Game/></>
    <WatchAndEarn id={""} />
    // <div className="bg-black min-h-screen text-white p-6 flex flex-col items-center">
    //   <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl shadow-md">
    //     <h2 className="text-xl font-bold mb-4">Staking</h2>

    //     {/* Coin for Payment */}
    //     <div className="flex items-center justify-between mb-4">
    //       <label className="text-gray-400">Coin for Payment:</label>
    //       <div className="flex items-center bg-gray-800 p-2 rounded-lg">
    //         <span className="mr-2">🟠</span> {/* Replace with the actual icon */}
    //         <select className="bg-transparent text-white">
    //           <option>BTC</option>
    //           <option>TON</option>
    //           <option>ETH</option>
    //         </select>
    //       </div>
    //     </div>

    //     {/* Stake Amount Input */}
    //     <div className="bg-gray-800 p-4 rounded-xl mb-4">
    //       <div className="flex justify-between items-center mb-2">
    //         <label className="text-gray-400">100 TON</label>
    //         <button className="bg-gray-600 p-2 rounded-full">🔄</button> {/* Reset button */}
    //       </div>
    //       <input
    //         type="number"
    //         value={stakeAmount}
    //         onChange={handleStakeAmountChange}
    //         className="w-full bg-transparent text-white text-3xl font-bold focus:outline-none"
    //       />
    //       <div className="flex justify-between mt-2 text-gray-500">
    //         <span>Min: 10 TON</span>
    //         <span>Max: 10,000 TON</span>
    //       </div>
    //     </div>

    //     {/* Staking Info */}
    //     <div className="text-gray-400 text-sm mb-4">
    //       <p>1 TON ≈ ${tonPrice}</p>
    //       <p>You Staking ≈ ${(stakeAmount * tonPrice).toFixed(2)} of TON</p>
    //     </div>

    //     {/* Stake Button */}
    //     <button className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-full text-white font-bold">
    //       Stake
    //     </button>

    //     {/* Estimated APY */}
    //     <div className="mt-4 text-center text-gray-400">
    //       <p>Est. Yearly Earn Reward</p>
    //       <p className="text-white font-bold">{apy}% APY</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
