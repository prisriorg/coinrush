"use client";
import React, { useEffect, useState } from "react";
import YoutubeIcon from "@/icons/YoutubeIcon";
import SubmitCheckIcon from "@/icons/SubmitCheckIcon";
// import WalletIcon from "../icons/WalletIcon";

const WatchAndEarn = (props: { id: string }) => {
  const [videoList, setVideoList] = useState<any[]>();
  const [gamesData, setGamesData] = useState<any[]>();
  const [tasksData, setTasksData] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [coins, setCoins] = useState<number>(100);
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [enteredCode, setEnteredCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedIs, setSelectedIs] = useState<string>("task");
  useEffect(() => {
    fetch("/api/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: parseInt(props.id) }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        setLoading(false);
        setVideoList(data.video);
        setGamesData(data.game);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, []);

  const selectVideo = (videoId: number) => {
    if (selectedVideoId === videoId) {
      setSelectedVideoId(null);
    } else {
      setSelectedVideoId(videoId);
      setEnteredCode("");
      setError("");
    }
  };

  const handleSubmitCode = (video: any) => {
    if (enteredCode === video.code) {
      setCoins((prevCoins) => prevCoins + 10);
      setSelectedVideoId(null);
    } else {
      setError("Incorrect code. Please try again.");
    }
  };

  return (
    <>
      <div className="my-6 flex justify-start items-start gap-4">
        <button
          className={`${
            selectedIs === "task"
              ? "bg-blue-500 hover:bg-blue-600 active:scale-95"
              : "bg-gray-700 hover:bg-blue-600 active:scale-95"
          } transition-transform duration-150 ease-in-out px-4 py-2 rounded-full shadow-md`}
          onClick={() => setSelectedIs("task")}
        >
          Task
        </button>

        <button
          className={`${
            selectedIs === "video"
              ? "bg-blue-500 hover:bg-blue-600 active:scale-95"
              : "bg-gray-700 hover:bg-blue-600 active:scale-95"
          } transition-transform duration-150 ease-in-out px-4 py-2 rounded-full shadow-md`}
          onClick={() => setSelectedIs("video")}
        >
          Watch
        </button>

        <button
          className={`${
            selectedIs === "games"
              ? "bg-blue-500 hover:bg-blue-600 active:scale-95"
              : "bg-gray-700 hover:bg-blue-600 active:scale-95"
          } transition-transform duration-150 ease-in-out px-4 py-2 rounded-full shadow-md`}
          onClick={() => setSelectedIs("games")}
        >
          Games
        </button>
      </div>

      {selectedIs === "games" ? (
        <div className="w-full max-w-md">
          <div className="grid grid-cols-2 gap-4">
            {gamesData?.length === 0 ? (
              <div className="flex justify-center items-center"> No More Task </div>
            ) : gamesData?.map((game) => (
              <a
                key={game.id}
                href={game.name}
                className="bg-gray-800 p-2 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-32 object-cover rounded-md mb-2 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                <h4 className="text-lg font-bold z-10">{game.name}</h4>
                <p className="text-gray-400 text-center z-10">
                  {game.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      ) : selectedIs === "video" ? (
        <div className="w-full max-w-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoList?.length === 0 ? (
              <div className="flex justify-center items-center"> No More Task </div>
            ) : videoList?.map((video) => (
              <div
                key={video.id}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
              >
                <h2 className="text-lg font-semibold text-gray-100 mb-2">
                  {video.title}
                </h2>
                <a
                  href={`${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
                >
                  <YoutubeIcon /> Open Video
                </a>

                {selectedVideoId === video.id && (
                  <div className="mt-4 w-full">
                    <div className="mb-4">
                      <label
                        htmlFor={`code-${video.id}`}
                        className="block mb-2 text-gray-300"
                      >
                        Enter Code from the Video:
                      </label>
                      <input
                        type="text"
                        id={`code-${video.id}`}
                        value={enteredCode}
                        onChange={(e) => setEnteredCode(e.target.value)}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md  focus:border-transparent focus:outline-none"
                        placeholder="Enter code here..."
                      />
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <button
                      onClick={() => handleSubmitCode(video)}
                      className="flex items-center justify-center bg-green-500 hover:bg-green-600 active:scale-95 transition-transform duration-150 ease-in-out text-white font-bold py-2 px-4 rounded-lg w-full"
                    >
                      <SubmitCheckIcon /> Submit Code
                    </button>
                  </div>
                )}

                <button
                  onClick={() => selectVideo(video.id)}
                  className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
                >
                  {selectedVideoId === video.id
                    ? "Hide Code Entry"
                    : "Enter Code to Earn"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : selectedIs === "task" ? (
        <div className="w-full max-w-md">
          <div className="grid grid-cols-2 gap-4">
            {gamesData?.length === 0 ? (
              <div className="w-full flex justify-center items-center"> No More Task </div>
            ) : (
              gamesData?.map((game) => (
                <a
                  key={game.id}
                  href={game.name}
                  className="bg-gray-800 p-2 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-32 object-cover rounded-md mb-2 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                  <h4 className="text-lg font-bold z-10">{game.name}</h4>
                  <p className="text-gray-400 text-center z-10">
                    {game.description}
                  </p>
                </a>
              ))
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default WatchAndEarn;
