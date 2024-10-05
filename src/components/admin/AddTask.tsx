"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddTask: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [taskCoin, setTaskCoin] = useState(0);
  const [loading, setLoading] = useState(false);
  const [taskLink, setTaskLink] = useState("");
  const [taskPlatform, setTaskPlatform] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!taskPlatform || !taskName || !taskCoin || !taskLink) {
      setError("All required");
      return;
    }
    const response = await fetch("/api/admin/addtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskPlatform, taskName, taskCoin, taskLink }),
    });
    const data: any = await response.json();
    if (data.error) {
      setError(data.error);
    } else if (data.message) {
      router.push("/admin/manage-task");
    }
    setTaskName("");
    setTaskCoin(0);
    setTaskLink("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Task</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="block text-sm font-semibold mb-2"
            >
              Select Platform
            </label>
            <select
              id="dark-select"
              onChange={(e) => setTaskPlatform(e.target.value)}
              className="block appearance-none w-full bg-gray-800 border border-gray-600 text-gray-200 hover:border-blue-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Youtube Subscribe">Youtube Subscribe</option>
              <option value="Youtube Like">Youtube Like</option>
              <option value="Youtube Comment">Youtube Comment</option>
              <option value="Instagram Follow">Instagram Follow</option>
              <option value="Instagram Like">Instagram Like</option>
              <option value="Instagram Comment">Instagram Comment</option>
              <option value="Telegram">Telegram</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="block text-sm font-semibold mb-2"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="taskCoins"
              className="block text-sm font-semibold mb-2"
            >
              Task Coin
            </label>
            <input
              type="number"
              id="TaskCoins"
              value={taskCoin}
              onChange={(e) => setTaskCoin(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter task Coin"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="taskLink"
              className="block text-sm font-semibold mb-2"
            >
              Task Link
            </label>
            <input
              type="text"
              id="taskLink"
              value={taskLink}
              onChange={(e) => setTaskLink(e.target.value)}
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
            {loading ? "Adding" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
