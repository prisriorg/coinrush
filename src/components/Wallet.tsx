import React, { useEffect, useState } from "react";
import CoinIcon from "@/icons/CoinIcon";
import TotalBal from "./TotalBal";
import History from "./History";
const Wallet = (props: { id: string }) => {
  const [selectedIs, setSelectedIs] = useState<string>("Withdrawal");
  const [referBal, setReferBal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [level1Bal, setLevel1Bal] = useState(0);
  const [level2Bal, setLevel2Bal] = useState(0);
  const [level3Bal, setLevel3Bal] = useState(0);

  useEffect(() => {
    fetch("/api/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: parseInt(props.id) }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        setBalance(data.balance);
        setReferBal(data.totalReferbal);
        setLevel1Bal(data.level1Bal);
        setLevel2Bal(data.level2Bal);
        setLevel3Bal(data.level3Bal);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, []);
  return (
    <>
      <TotalBal coin={balance.toFixed(2)} refer={referBal.toFixed(2)} />
      <div className="mt-6 flex justify-center gap-4">
        <button
          className={`${
            selectedIs === "Withdrawal"
              ? "bg-blue-500 hover:bg-blue-600 active:scale-95"
              : "bg-gray-700 hover:bg-blue-600 active:scale-95"
          } transition-transform duration-150 ease-in-out px-4 py-2 rounded-full shadow-md`}
          onClick={() => setSelectedIs("Withdrawal")}
        >
          Withdrawal
        </button>
        <button
          className={`${
            selectedIs === "Check"
              ? "bg-blue-500 hover:bg-blue-600 active:scale-95"
              : "bg-gray-700 hover:bg-blue-600 active:scale-95"
          } transition-transform duration-150 ease-in-out px-4 py-2 rounded-full shadow-md`}
          onClick={() => setSelectedIs("Check")}
        >
          Check In
        </button>
      </div>

      {/* Asset List */}
      <div className="mt-8 w-full max-w-md bg-gray-800 p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-bold pb-2">Refer Earning</h3>
        <div className="flex justify-between items-center py-2 border-b-2 border-gray-700">
          <span className="text-gray-400">Level 1</span>
          <span className="flex  text-green-400">
            <CoinIcon className="w-4 mr-2" />
            {level1Bal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b-2 border-gray-700">
          <span className="text-gray-400">Level 2</span>
          <span className="flex  text-green-400">
            <CoinIcon className="w-4 mr-2" />
            {level2Bal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-400">Level 3</span>
          <span className="flex text-green-400">
            <CoinIcon className="w-4 mr-2" />
            {level3Bal.toFixed(2)}
          </span>
        </div>
      </div>

      <History id={props.id} />
    </>
  );
};

export default Wallet;
