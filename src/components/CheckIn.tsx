import React, { useState } from 'react';

const SevenDaysCheckInDark: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<boolean[]>(Array(7).fill(false));
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [reward] = useState<number>(1000);

  // Function to handle claim action
  const handleClaim = () => {
    const newCompletedDays = [...completedDays];
    newCompletedDays[currentDay] = true;
    setCompletedDays(newCompletedDays);
    setCurrentDay((prevDay) => (prevDay + 1) % 7); // Move to next day
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-6 space-y-10">
      {/* Daily Reward Section */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl text-center max-w-xs">
        <h2 className="text-lg font-semibold text-yellow-400 mb-2">Daily Reward</h2>
        <p className="text-gray-400">Come back everyday to earn extra reward points!</p>
        <div className="bg-gray-700 p-4 rounded-lg mt-4 shadow-md">
          <p className="text-xl font-bold text-white">Today s Reward</p>
          <p className="text-4xl font-extrabold text-green-400 mt-2">+P {reward}</p>
        </div>
        <button
          onClick={handleClaim}
          className="bg-green-500 hover:bg-green-600 text-lg font-bold text-white py-2 px-4 rounded-lg mt-4 shadow-lg transition-transform transform hover:scale-105"
        >
          Claim
        </button>
      </div>

      {/* Success/Completion Panel */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl text-center max-w-sm">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Good job!</h2>
        <p className="text-gray-300">
          You have earned <span className="text-green-400 font-bold">P {reward}</span> today, and accomplished all Check-In rewards!
        </p>

        {/* Grid showing 7 days check-in */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className={`p-4 rounded-full border-2 ${completedDays[index] ? 'border-green-400 bg-green-600' : 'border-gray-400 bg-gray-700'} transition-all`}>
              {completedDays[index] ? (
                <span className="text-2xl font-bold text-white">✔</span>
              ) : (
                <span className="text-gray-400 text-xl">Day {index + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SevenDaysCheckInDark;
