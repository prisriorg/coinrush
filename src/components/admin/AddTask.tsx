"use client"
import React, { useState } from 'react';

const AddTask: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!taskName) {
      setError('Task name is required');
      return;
    }

    // Mock API call to add a task (replace this with actual API logic)
    const newTask = {
      name: taskName,
      description: taskDescription,
    };

    console.log('Task added:', newTask);
    
    // Reset form fields
    setTaskName('');
    setTaskDescription('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Task</h1>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label htmlFor="taskName" className="block text-sm font-semibold mb-2">Task Name</label>
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
            <label htmlFor="taskDescription" className="block text-sm font-semibold mb-2">Task Description</label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter task description"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
