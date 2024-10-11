import React, { useEffect, useState } from "react";

import { Icon28Close } from "@telegram-apps/telegram-ui/dist/icons/28/close";
import CoinIcon from "@/icons/CoinIcon";
const Withdrawal = (props: { id: string; coin: string }) => {
  const [uid, setUid] = useState<number>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<string>("selected");
  const [coinsIs, setCoinIs] = useState<number>(parseInt(props.coin));
  const coins = [
    { name: "Pepe", points: 1000, value: 3000 },
    { name: "Shiba Inu", points: 1000, value: 1500 },
    { name: "Bonk", points: 1000, value: 1100 },
  ];

  const handleSubmit = () => {
    if (coinsIs >= 1000) {
      if (uid && selectedCoin !== "selected") {
        setDisabled(true);
        fetch("/api/withdrawal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: parseInt(props.id),
            payment: selectedCoin,
            uid,
          }),
        })
          .then((response) => response.json())
          .then((data: any) => {
            setDisabled(false);
            if (data.success) {
              setSuccess(data.success);
              setCoinIs(0);
            }
            if (data.error) {
              setError(data.error);
            }
          })
          .catch((error) => {
            console.error("Error fetching history:", error);
          });
      } else {
        setError("Please Enter UID");
      }
    } else {
      setError("Insufficient Coin");
    }
  };
  return (
    <>
      <div className="flex items-end justify-between">
        <div></div>

        <div className="flex items-end justify-between">
          <CoinIcon className="w-6 mr-2" /> {parseInt(props.coin)}
        </div>
      </div>
      <div className="m-4">
        <label htmlFor="taskName" className="block text-sm font-semibold mb-2">
          Select a Coin
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coins.map((coin, index) => (
            <div
              key={index}
              className={`p-2 border rounded-md cursor-pointer ${
                selectedCoin === coin.name
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => {
                coinsIs >= 1000
                  ? setSelectedCoin(coin.name)
                  : setError("Insufficient Coin");
              }}
            >
              <p className="flex">
                {coin.points} <CoinIcon className="w-4 mx-2" /> = {coin.value}{" "}
                {coin.name}
              </p>
            </div>
          ))}
        </div>
        <label htmlFor="taskName" className="block text-sm font-semibold my-2">
          Enter Binance UID
        </label>
        <input
          type="number"
          id="taskName"
          value={uid}
          onChange={(e) => setUid(parseInt(e.target.value))}
          className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="123456789"
          required
        />

        {success && <p className="text-green-500 my-2">{success}</p>}
        {error && <p className="text-red-500 my-2">{error}</p>}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button
          className={`bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform duration-150 ease-in-out px-4 py-2 rounded-full shadow-md`}
          onClick={handleSubmit}
          disabled={disabled}
        >
          Withdrawal
        </button>
      </div>
    </>
  );
};
export default Withdrawal;
