"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddGame: React.FC = () => {
  const [gameName, setGameName] = useState("");
  const [gameLink, setGameLink] = useState("");
  const [gamesIamge, setGameImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");  // Reset error before making a request
    if (!gameLink || !gamesIamge || !gameName) {
      setError("All fields are required");
      setLoading(false); // Stop loading if validation fails
      return;
    }
    try {
      const response = await fetch("/api/admin/addgame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gamesIamge, gameLink, gameName }),
      });
      const data:any = await response.json();
  
      if (data.error) {
        setError(typeof data.error === 'string' ? data.error : 'Unexpected error occurred');
      } else if (data.message) {
        router.push("/admin/manage-games");
      }
    } catch (err) {
      setError("Failed to add game. Please try again.");
    } finally {
      setGameImage("");
      setGameLink("");
      setGameName("");
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Games</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="gameName"
              className="block text-sm font-semibold mb-2"
            >
              Game Name
            </label>
            <input
              type="text"
              id="gameName"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter Game Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gameLink"
              className="block text-sm font-semibold mb-2"
            >
              Game Link
            </label>
            <input
              type="text"
              id="gameLink"
              value={gameLink}
              onChange={(e) => setGameLink(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter game link"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gameIamge"
              className="block text-sm font-semibold mb-2"
            >
              Game Image
            </label>
            <input
              type="text"
              id="gameIamge"
              value={gamesIamge}
              onChange={(e) => setGameImage(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter game image"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded"
          >
            {loading ? "Adding" : "Add Game"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGame;
