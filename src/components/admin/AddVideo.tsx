"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddVideo: React.FC = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoCoin, setVideoCoin] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoCode, setVideoCode] = useState(0);
  const [error, setError] = useState("");

  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!videoLink || !videoCoin || !videoCode) {
      setError("All required");
      return;
    }
    const response = await fetch("/api/admin/addvideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoLink, videoCoin, videoCode }),
    });
    const data: any = await response.json();
    if (data.error) {
      setError(data.error);
    } else if (data.message) {
      router.push("/admin/manage-videos");
    }
    setVideoLink("");
    setVideoCoin(0);
    setVideoCode(0);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Video</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="VideoLink"
              className="block text-sm font-semibold mb-2"
            >
              Video Link
            </label>
            <input
              type="text"
              id="VideoLink"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="videoCoins"
              className="block text-sm font-semibold mb-2"
            >
              Video Coin
            </label>
            <input
              type="number"
              id="videokCoins"
              value={videoCoin}
              onChange={(e) => setVideoCoin(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter task Coin"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Videocode"
              className="block text-sm font-semibold mb-2"
            >
              Video Code
            </label>
            <input
              type="number"
              id="Videocode"
              value={videoCode}
              onChange={(e) => setVideoCode(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter task Link"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded"
          >
            {loading ? "Adding" : "Add Video"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
