"use client";
import React, { useEffect, useState } from "react";

// Mock Task Interface
interface Task {
  id: number;
  name: string;
  description: string;
}

const ManageVideo: React.FC = () => {
  // Mock task data
  const [videos, setVideos] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    addData();
  }, []);
  const addData = () => {
    setLoading(true);
    fetch("/api/admin/manage-videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "",
      }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        setLoading(false);
        setVideos(data.data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  };
  // Function to handle deleting a task
  const handleDelete = (id: number) => {
    const updatedTasks = videos.filter((task) => task.id !== id);
    setVideos(updatedTasks);
  };

  // Function to handle editing a task (mocked)
  const handleEdit = (id: number) => {
    const updatedTasks = videos.map((task) => {
      if (task.id === id) {
        const newName = prompt("Enter new task name", task.name);
        const newDescription = prompt(
          "Enter new task description",
          task.description
        );
        if (newName && newDescription) {
          return { ...task, name: newName, description: newDescription };
        }
      }
      return task;
    });
    setVideos(updatedTasks);
  };

  return loading ? (
    <div className="h-1 w-full overflow-hidden">
      <div className="animate-progress w-full h-full bg-gray-400 origin-left-right"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Manage Tasks</h1>

        <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Task Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((task) => (
              <tr key={task.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{task.id}</td>
                <td className="px-4 py-2">{task.name}</td>
                <td className="px-4 py-2">{task.description}</td>
                <td className="px-4 py-2">
                  {/* <button
                    onClick={() => handleEdit(task.id)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVideo;
