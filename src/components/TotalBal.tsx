"use client"
import CoinIcon from "@/icons/CoinIcon";
import React from "react";

const TotalBal = (props: { coin: number; refer: number }) => {
  return (
    <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-center text-3xl font-bold flex justify-center items-center">
        <CoinIcon className="w-6 mr-2" />
        {props.coin}
      </h2>
      <p className="flex-row flex justify-center text-center text-gray-400 mt-2">
        Refer Balance :
        <span className="flex text-white">
          <CoinIcon className="w-4 mx-1" />
          {props.refer}
        </span>
      </p>
    </div>
  );
};

export default TotalBal;

